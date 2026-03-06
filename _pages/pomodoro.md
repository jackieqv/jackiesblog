---
title: "Focus Corner"
permalink: /pomodoro/
layout: single
---

<div class="cozy-pomodoro">
  <div class="cozy-card">
    <div class="cozy-badge" id="modeBadge">🍅 Focus</div>

    <p class="cozy-kicker">make · rest · repeat</p>
    <h1 class="cozy-timer" id="timer">25:00</h1>
    <p class="cozy-note" id="statusText">
      A quiet corner for crafting, writing, coding, and learning.
    </p>

    <div class="cozy-ring-wrap">
      <div class="cozy-ring">
        <svg viewBox="0 0 120 120" class="ring-svg" aria-hidden="true">
          <circle class="ring-bg" cx="60" cy="60" r="52"></circle>
          <circle class="ring-progress" id="ringProgress" cx="60" cy="60" r="52"></circle>
        </svg>
        <div class="ring-center">
          <span id="ringLabel">Focus</span>
        </div>
      </div>
    </div>

    <div class="cozy-actions">
      <button class="cozy-btn cozy-btn-primary" onclick="startTimer()">Start</button>
      <button class="cozy-btn" onclick="pauseTimer()">Pause</button>
      <button class="cozy-btn" onclick="resetTimer()">Reset</button>
    </div>

    <div class="cozy-modes">
      <button class="cozy-pill" onclick="setMode('focus', 25)">25 min focus</button>
      <button class="cozy-pill" onclick="setMode('shortBreak', 5)">5 min tea break</button>
      <button class="cozy-pill" onclick="setMode('longBreak', 15)">15 min reset</button>
    </div>

    <div class="cozy-footer">
      <span id="cycleText">Cycle 1</span>
      <span class="cozy-dot">•</span>
      <span id="savedText">Saved locally</span>
    </div>
  </div>
</div>

<style>
.cozy-pomodoro {
  --cp-card-top: rgba(37, 43, 41, 0.86);
  --cp-card-bottom: rgba(27, 32, 30, 0.82);
  --cp-card-border: rgba(255, 255, 255, 0.08);
  --cp-sage: #9caf98;
  --cp-sage-dark: #7f927b;
  --cp-terracotta: #c98b73;
  --cp-ink: #f4efe6;
  --cp-muted: #c6beb2;
  --cp-muted-2: #a8afa8;
  --cp-button: rgba(255, 255, 255, 0.05);
  --cp-button-border: rgba(255, 255, 255, 0.09);
  --cp-shadow: 0 20px 48px rgba(0, 0, 0, 0.24);

  display: flex;
  justify-content: center;
  padding: 2rem 1rem 3rem;
}

.cozy-card {
  width: 100%;
  max-width: 720px;
  background:
    linear-gradient(180deg, var(--cp-card-top) 0%, var(--cp-card-bottom) 100%);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--cp-card-border);
  box-shadow: var(--cp-shadow);
  border-radius: 28px;
  padding: 2.2rem 1.4rem 2rem;
  text-align: center;
}

.cozy-badge {
  display: inline-block;
  padding: 0.45rem 0.9rem;
  background: rgba(201, 139, 115, 0.12);
  color: var(--cp-ink);
  border: 1px solid rgba(201, 139, 115, 0.22);
  border-radius: 999px;
  font-size: 0.92rem;
  margin-bottom: 0.9rem;
}

.cozy-kicker {
  margin: 0 0 0.6rem;
  text-transform: lowercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  color: var(--cp-muted-2);
}

.cozy-timer {
  margin: 0;
  font-size: clamp(3.6rem, 10vw, 6.2rem);
  line-height: 1;
  color: var(--cp-ink);
}

.cozy-note {
  margin: 0.9rem auto 1.5rem;
  max-width: 32rem;
  font-size: 1rem;
  color: var(--cp-muted);
}

.cozy-ring-wrap {
  display: flex;
  justify-content: center;
  margin: 1.2rem 0 1.6rem;
}

.cozy-ring {
  position: relative;
  width: 210px;
  height: 210px;
}

.ring-svg {
  width: 210px;
  height: 210px;
  transform: rotate(-90deg);
}

.ring-bg,
.ring-progress {
  fill: none;
  stroke-width: 8;
}

.ring-bg {
  stroke: rgba(255, 255, 255, 0.12);
}

.ring-progress {
  stroke: rgb(156, 175, 152);
  stroke-linecap: round;
  stroke-dasharray: 326.73;
  stroke-dashoffset: 326.73;
  transition: stroke-dashoffset 0.4s ease, stroke 0.4s linear;
  filter: drop-shadow(0 0 8px rgba(201, 139, 115, 0.16));
}

.ring-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #b9c0b8;
}

.cozy-actions,
.cozy-modes {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.cozy-actions {
  margin-bottom: 1rem;
}

.cozy-btn,
.cozy-pill {
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.2rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    opacity 0.15s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.cozy-btn:hover,
.cozy-pill:hover {
  transform: translateY(-1px);
}

.cozy-btn {
  background: var(--cp-button);
  color: var(--cp-ink);
  border: 1px solid var(--cp-button-border);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.cozy-btn-primary {
  background: var(--cp-sage-dark);
  color: #101513;
}

.cozy-pill {
  background: rgba(255, 255, 255, 0.04);
  color: var(--cp-ink);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.cozy-btn:hover {
  background: rgba(255, 255, 255, 0.08);
}

.cozy-btn-primary:hover {
  background: #90a28b;
}

.cozy-pill:hover {
  background: rgba(255, 255, 255, 0.07);
}

.cozy-btn:focus-visible,
.cozy-pill:focus-visible {
  outline: 2px solid rgba(156, 175, 152, 0.55);
  outline-offset: 2px;
}

.cozy-footer {
  margin-top: 1.4rem;
  color: var(--cp-muted-2);
  font-size: 0.92rem;
}

.cozy-dot {
  margin: 0 0.45rem;
}

@media (max-width: 480px) {
  .cozy-card {
    padding: 1.6rem 1rem 1.5rem;
    border-radius: 24px;
  }

  .cozy-ring,
  .ring-svg {
    width: 180px;
    height: 180px;
  }

  .cozy-actions,
  .cozy-modes {
    gap: 0.65rem;
  }

  .cozy-btn,
  .cozy-pill {
    width: 100%;
  }
}
</style>

<script>
let timer = null;
let running = false;
let mode = "focus";
let totalTime = 25 * 60;
let timeLeft = totalTime;
let cycle = 1;

const timerEl = document.getElementById("timer");
const statusTextEl = document.getElementById("statusText");
const cycleTextEl = document.getElementById("cycleText");
const modeBadgeEl = document.getElementById("modeBadge");
const ringLabelEl = document.getElementById("ringLabel");
const ringProgressEl = document.getElementById("ringProgress");
const savedTextEl = document.getElementById("savedText");

const CIRCUMFERENCE = 2 * Math.PI * 52;
const startColor = [156, 175, 152];
const endColor = [201, 139, 115];

function saveState() {
  const state = {
    mode,
    totalTime,
    timeLeft,
    cycle
  };
  localStorage.setItem("cozyPomodoroState", JSON.stringify(state));
  savedTextEl.textContent = "Saved locally";
}

function loadState() {
  const raw = localStorage.getItem("cozyPomodoroState");
  if (!raw) return;

  try {
    const state = JSON.parse(raw);
    if (state.mode) mode = state.mode;
    if (state.totalTime) totalTime = state.totalTime;
    if (typeof state.timeLeft === "number") timeLeft = state.timeLeft;
    if (state.cycle) cycle = state.cycle;
  } catch (e) {
    console.log("No saved Pomodoro state found.");
  }
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const progress = (totalTime - timeLeft) / totalTime;
  const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE;
  ringProgressEl.style.strokeDasharray = CIRCUMFERENCE;
  ringProgressEl.style.strokeDashoffset = offset;

  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * progress);
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * progress);
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * progress);
  ringProgressEl.style.stroke = `rgb(${r}, ${g}, ${b})`;
}

function updateTexts() {
  if (mode === "focus") {
    modeBadgeEl.textContent = "🍅 Focus";
    ringLabelEl.textContent = "Focus";
    statusTextEl.textContent = "A quiet corner for crafting, writing, coding, and learning.";
  } else if (mode === "shortBreak") {
    modeBadgeEl.textContent = "☕ Tea break";
    ringLabelEl.textContent = "Break";
    statusTextEl.textContent = "Step away for a moment, stretch gently, and rest your eyes.";
  } else {
    modeBadgeEl.textContent = "🌿 Reset";
    ringLabelEl.textContent = "Reset";
    statusTextEl.textContent = "A slower pause to breathe, wander, and begin again softly.";
  }

  cycleTextEl.textContent = `Cycle ${cycle}`;
}

function startTimer() {
  if (running) return;
  running = true;
  savedTextEl.textContent = "Running";

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
      saveState();
    } else {
      clearInterval(timer);
      running = false;
      handleSessionEnd();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
  savedTextEl.textContent = "Paused";
  saveState();
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  timeLeft = totalTime;
  savedTextEl.textContent = "Reset";
  updateDisplay();
  saveState();
}

function setMode(newMode, minutes) {
  clearInterval(timer);
  running = false;
  mode = newMode;
  totalTime = minutes * 60;
  timeLeft = totalTime;
  updateTexts();
  updateDisplay();
  saveState();
}

function handleSessionEnd() {
  if (mode === "focus") {
    alert("Focus session finished. Time for a gentle break.");
    cycle++;
    mode = "shortBreak";
    totalTime = 5 * 60;
    timeLeft = totalTime;
  } else {
    alert("Break finished. Ready to begin again?");
    mode = "focus";
    totalTime = 25 * 60;
    timeLeft = totalTime;
  }

  updateTexts();
  updateDisplay();
  saveState();
}

loadState();
updateTexts();
updateDisplay();
</script>
