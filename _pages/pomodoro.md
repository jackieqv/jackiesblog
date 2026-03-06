---
title: "Pomodoro Timer"
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
:root {
  --cp-cream: #f7f3eb;
  --cp-paper: #fffdf9;
  --cp-sage: #aebea6;
  --cp-sage-dark: #768772;
  --cp-terracotta: #c98d74;
  --cp-ink: #2f342f;
  --cp-soft: rgba(47, 52, 47, 0.08);
  --cp-shadow: 0 18px 40px rgba(39, 44, 39, 0.10);
}

.cozy-pomodoro {
  --cp-paper: #fffdf8;        /* warm paper */
  --cp-cream: #f6f1e8;        /* linen */
  --cp-sage: #a8b8a2;         /* soft sage */
  --cp-sage-dark: #6f8a6b;    /* darker sage */
  --cp-terracotta: #d08c72;   /* clay / handmade */
  --cp-ink: #2f3432;          /* readable dark text */
}

.cozy-card {
  width: 100%;
  max-width: 720px;
  background: linear-gradient(180deg, var(--cp-paper) 0%, var(--cp-cream) 100%);
  border-radius: 28px;
  padding: 2.2rem 1.4rem 2rem;
  text-align: center;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 15px 35px rgba(0,0,0,0.08);
}

.cozy-badge {
  display: inline-block;
  padding: 0.45rem 0.9rem;
  background: rgba(201, 141, 116, 0.12);
  color: var(--cp-ink);
  border: 1px solid rgba(201, 141, 116, 0.18);
  border-radius: 999px;
  font-size: 0.92rem;
  margin-bottom: 0.9rem;
}

.cozy-kicker {
  margin: 0 0 0.6rem;
  text-transform: lowercase;
  letter-spacing: 0.08em;
  font-size: 0.82rem;
  color: rgba(47, 52, 47, 0.65);
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
  color: rgba(47, 52, 47, 0.74);
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
  stroke: rgba(47, 52, 47, 0.08);
}

.ring-progress {
  stroke: var(--cp-terracotta);
  stroke-linecap: round;
  stroke-dasharray: 326.73;
  stroke-dashoffset: 326.73;
  transition: stroke-dashoffset 0.4s ease;
}

.ring-center {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: rgba(47, 52, 47, 0.7);
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
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}

.cozy-btn:hover,
.cozy-pill:hover {
  transform: translateY(-1px);
}

.cozy-btn {
  background: #ffffff;
  color: var(--cp-ink);
  box-shadow: 0 8px 18px rgba(47, 52, 47, 0.06);
  border: 1px solid rgba(47, 52, 47, 0.06);
}

.cozy-btn-primary {
  background: var(--cp-sage-dark);
  color: white;
}

.cozy-pill {
  background: rgba(174, 190, 166, 0.12);
  color: var(--cp-ink);
  border: 1px solid rgba(118, 135, 114, 0.12);
}

.cozy-footer {
  margin-top: 1.4rem;
  color: rgba(47, 52, 47, 0.62);
  font-size: 0.92rem;
}

.cozy-dot {
  margin: 0 0.45rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --cp-cream: #1e211f;
    --cp-paper: #232725;
    --cp-sage: #91a28a;
    --cp-sage-dark: #b0c0a9;
    --cp-terracotta: #d49a80;
    --cp-ink: #f3f1ea;
    --cp-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  }

  .cozy-card {
    border-color: rgba(255, 255, 255, 0.06);
  }

  .cozy-badge,
  .cozy-pill {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .cozy-btn {
    background: rgba(255, 255, 255, 0.05);
    color: var(--cp-ink);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .cozy-btn-primary {
    background: var(--cp-sage-dark);
    color: #1b1d1b;
  }

  .ring-bg {
    stroke: rgba(255, 255, 255, 0.1);
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
