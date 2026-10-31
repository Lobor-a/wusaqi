'use strict';

/** Register every scheme together: later Electron registrations replace privilege switches. */
function registerDesktopProtocols(protocol, { bridge = false, lolPing = false } = {}) {
  const schemes = [];
  if (lolPing) {
    schemes.push({
      scheme: 'lolping',
      privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true },
    });
  }
  if (bridge) {
    schemes.push({
      scheme: 'dsh-pet-bridge',
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
        stream: true,
        bypassCSP: true,
        corsEnabled: true,
      },
    });
  }
  if (schemes.length) protocol.registerSchemesAsPrivileged(schemes);
}

module.exports = { registerDesktopProtocols };
