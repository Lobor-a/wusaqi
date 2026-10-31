import { M as MAX_TEXT } from "./roomProtocol-Drasuf7-.js";
import "./pings-Ce34JV4E.js";
const input = document.getElementById("message");
const count = document.getElementById("count");
const hint = document.getElementById("hint");
const COUNT_FROM = MAX_TEXT - 20;
let words = null;
const showHint = (message, warn) => {
  hint.textContent = message;
  hint.classList.toggle("warn", warn);
};
function clamp() {
  const points = [...input.value];
  if (points.length > MAX_TEXT) input.value = points.slice(0, MAX_TEXT).join("");
  const used = Math.min(points.length, MAX_TEXT);
  count.hidden = used < COUNT_FROM;
  count.textContent = `${used}/${MAX_TEXT}`;
  count.classList.toggle("full", used >= MAX_TEXT);
}
let sending = false;
async function send() {
  if (sending) return;
  sending = true;
  let answer;
  try {
    answer = await window.textApi.submit(input.value);
  } catch (error) {
    sending = false;
    throw error;
  }
  if (answer === "sent") return;
  sending = false;
  if (answer === "unknown") showHint(words?.unknown ?? "", true);
  else if (answer === "votesOff") showHint(words?.votesOff ?? "", true);
}
input.addEventListener("input", (event) => {
  if (!event.isComposing) clamp();
  if (words) showHint(words.hint, false);
});
input.addEventListener("compositionend", clamp);
input.addEventListener("keydown", (event) => {
  if (event.isComposing) return;
  if (event.key === "Enter") {
    event.preventDefault();
    void send();
  } else if (event.key === "Escape") {
    event.preventDefault();
    window.textApi.cancel();
  } else if (event.key === "Tab") {
    event.preventDefault();
  }
});
void window.textApi.strings().then((t) => {
  if (!t) return;
  words = t;
  input.placeholder = t.placeholder;
  showHint(t.hint, false);
});
requestAnimationFrame(() => input.focus());
