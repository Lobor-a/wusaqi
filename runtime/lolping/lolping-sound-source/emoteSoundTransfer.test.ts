import { createHash } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EmoteSoundTransfer } from '../../src/main/emoteSoundTransfer';
import { SOUND_MAX_BYTES } from '../../src/shared/emotes';
import { SOUND_CHUNK_BYTES, SOUND_WINDOW, validateMessage, type SoundInfo } from '../../src/shared/roomProtocol';

const PEER = 'a'.repeat(16);
const SELF = 'b'.repeat(16);
const HASH = 'c'.repeat(32);
const base = { peer: PEER, seq: 1, ts: 0, to: SELF, h: HASH };
const audio = (size = 1800): Uint8Array => {
  const bytes = new Uint8Array(size).fill(1);
  bytes.set(Buffer.from('OggS'));
  return bytes;
};
const infoOf = (bytes: Uint8Array): SoundInfo => ({
  a: createHash('sha256').update(bytes).digest('hex'), size: bytes.length, format: 'ogg',
});

function harness() {
  const state = { enabled: true, allowed: true, announced: [HASH] };
  const out: Record<string, unknown>[] = [];
  const files = new Map<string, Uint8Array>();
  const cache = new Map<string, Uint8Array>();
  const transfer = new EmoteSoundTransfer({
    now: Date.now, enabled: () => state.enabled, canPeer: () => state.allowed,
    announced: () => state.announced, sound: async (h) => files.get(h) ?? null,
    have: (h) => cache.has(h), put: async (h, b) => { cache.set(h, b); return true; },
    touch: () => undefined, send: (_peer, body) => { out.push(body); },
  });
  transfer.announced(PEER, [HASH]);
  return { transfer, state, out, files, cache };
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => { vi.clearAllTimers(); vi.useRealTimers(); });

describe('room sound transfer', () => {
  it('prefetches a signed sound binding in bounded windows and exposes only verified bytes', async () => {
    const h = harness();
    const bytes = audio(90_000);
    const info = infoOf(bytes);
    await vi.advanceTimersByTimeAsync(100);
    expect(h.out[0]?.t).toBe('sound-want');
    h.transfer.onInfo({ ...base, t: 'sound-info', info });
    expect(h.transfer.url(PEER, HASH)).toBeNull();
    for (let i = 0; i < Math.ceil(bytes.length / SOUND_CHUNK_BYTES); i++) {
      const b = Buffer.from(bytes.subarray(i * SOUND_CHUNK_BYTES, (i + 1) * SOUND_CHUNK_BYTES)).toString('base64');
      h.transfer.onChunk({ ...base, t: 'sound-chunk', a: info.a, i, b });
    }
    await Promise.resolve();
    expect(h.cache.get(info.a)).toEqual(bytes);
    expect(h.transfer.url(PEER, HASH)).toBe(`lolping://emotes/${info.a}.sound`);
    expect(h.out.filter((m) => m.t === 'sound-want').every((m) =>
      m.need === undefined || Array.isArray(m.need) && m.need.length <= SOUND_WINDOW)).toBe(true);
    h.transfer.stop();
  });

  it('rejects a corrupt sound and never substitutes a local sound under the same still hash', async () => {
    const h = harness();
    const bytes = audio(1500);
    const info = infoOf(bytes);
    h.cache.set(info.a, bytes);
    expect(h.transfer.url(PEER, HASH)).toBeNull();
    await vi.advanceTimersByTimeAsync(100);
    h.transfer.onInfo({ ...base, t: 'sound-info', info });
    expect(h.transfer.url(PEER, HASH)).toBe(`lolping://emotes/${info.a}.sound`);
    h.transfer.announced(PEER, []);
    expect(h.transfer.url(PEER, HASH)).toBeNull();
    h.transfer.stop();
  });

  it('serves only announced, valid and bounded audio', async () => {
    const h = harness();
    h.files.set(HASH, audio());
    await h.transfer.onWant({ ...base, t: 'sound-want' });
    expect(h.out.at(-1)?.info).toEqual(infoOf(h.files.get(HASH)!));
    h.files.set(HASH, audio(SOUND_MAX_BYTES + 1));
    h.transfer.invalidateSources();
    await h.transfer.onWant({ ...base, t: 'sound-want' });
    expect(h.out.at(-1)?.info).toBeNull();
    h.transfer.stop();
  });

  it('validates audio wire format and size before allocating a receive buffer', () => {
    const bytes = audio();
    const info = infoOf(bytes);
    expect(validateMessage({ ...base, t: 'sound-info', info })).toMatchObject({ info });
    expect(validateMessage({ ...base, t: 'sound-info', info: { ...info, size: SOUND_MAX_BYTES + 1 } })).toBeNull();
    expect(validateMessage({ ...base, t: 'sound-info', info: { ...info, format: 'exe' } })).toBeNull();
    expect(validateMessage({ ...base, t: 'sound-want', a: info.a, need: [0] })).not.toBeNull();
    expect(validateMessage({ ...base, t: 'sound-want', a: info.a, need: [99999] })).toBeNull();
  });
});
