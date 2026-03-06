---
title: "Pomodoro Timer"
permalink: /pomodoro/
layout: single
---

<div class="hk-pomodoro">
  <div class="hk-card">
    <p class="hk-label" id="sessionLabel">Focus session</p>
    <h1 class="hk-timer" id="timer">25:00</h1>
    <p class="hk-subtext" id="statusText">A quiet space for making, writing, and learning.</p>

    <div class="hk-progress-wrap">
      <div class="hk-progress" id="progressBar"></div>
    </div>

    <div class="hk-buttons">
      <button class="hk-btn hk-btn-primary" onclick="startTimer()">Start</button>
      <button class="hk-btn" onclick="pauseTimer()">Pause</button>
      <button class="hk-btn" onclick="resetTimer()">Reset</button>
    </div>

    <div class="hk-secondary-buttons">
      <button class="hk-chip" onclick="setMode('focus', 25)">25 min focus</button>
      <button class="hk-chip" onclick="setMode('shortBreak', 5)">5 min break</button>
      <button class="hk-chip" onclick="setMode('longBreak', 15)">15 min reset</button>
    </div>

    <p class="hk-footer" id="cycleText">Cycle 1</p>
  </div>
</div>

<style>
.hk-pomodoro {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem 3rem;
}

.hk-card {
  width: 100%;
  max-width: 680px;
  padding: 2.5rem 2rem;
  border-radius: 24px;
  background: #faf8f4;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  text-align: center;
  border: 1px solid rgba(0,0,0,0.05);
}

.hk-label {
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
  margin-bottom: 0.75rem;
}

.hk-timer {
  font-size: clamp(3.5rem, 9vw, 6rem);
  line-height: 1;
  margin: 0;
  font-weight: 700;
}

.hk-subtext {
  margin-top: 0.9rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  opacity: 0.75;
}

.hk-progress-wrap {
  width: 100%;
  height: 12px;
  background: rgba(0,0,0,0.08);
  border-radius: 999px;
  overflow: hidden;
  margin: 1.5rem 0 1.75rem;
}

.hk-progress {
  height: 100%;
  width: 0%;
  border-radius: 999px;
  background: linear-gradient(90deg, #d8a48f, #b7c7a3);
  transition: width 0.4s ease;
}

.hk-buttons,
.hk-secondary-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hk-buttons {
  margin-bottom: 1rem;
}

.hk-btn,
.hk-chip {
  border: none;
  border-radius: 999px;
  padding: 0.8rem 1.2rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.hk-btn:hover,
.hk-chip:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

.hk-btn {
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.hk-btn-primary {
  background: #1f2937;
  color: white;
}

.hk-chip {
  background: transparent;
  border: 1px solid rgba(0,0,0,0.1);
}

.hk-footer {
  margin-top: 1.5rem;
  font-size: 0.95rem;
  opacity: 0.65;
}

@media (prefers-color-scheme: dark) {
  .hk-card {
    background: #1f1f1f;
    border-color: rgba(255,255,255,0.06);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  }

  .hk-btn,
  .hk-chip {
    background: #2c2c2c;
    color: #f3f3f3;
    border-color: rgba(255,255,255,0.08);
  }

  .hk-btn-primary {
    background: #f3f3f3;
    color: #1f1f1f;
  }

  .hk-progress-wrap {
    background: rgba(255,255,255,0.1);
  }
}
</style>

<script>
let timer;
let running = false;
let mode = "focus";
let totalTime = 25 * 60;
let timeLeft = totalTime;
let cycle = 1;

const timerEl = document.getElementById("timer");
const sessionLabelEl = document.getElementById("sessionLabel");
const statusTextEl = document.getElementById("statusText");
const progressBarEl = document.getElementById("progressBar");
const cycleTextEl = document.getElementById("cycleText");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerEl.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  progressBarEl.style.width = `${progress}%`;
}

function updateTexts() {
  if (mode === "focus") {
    sessionLabelEl.textContent = "Focus session";
    statusTextEl.textContent = "A quiet space for making, writing, and learning.";
  } else if (mode === "shortBreak") {
    sessionLabelEl.textContent = "Short break";
    statusTextEl.textContent = "Stretch, breathe, make tea, rest your eyes.";
  } else {
    sessionLabelEl.textContent = "Long break";
    statusTextEl.textContent = "A slower pause before beginning again.";
  }

  cycleTextEl.textContent = `Cycle ${cycle}`;
}

function startTimer() {
  if (running) return;
  running = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
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
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  timeLeft = totalTime;
  updateDisplay();
}

function setMode(newMode, minutes) {
  clearInterval(timer);
  running = false;
  mode = newMode;
  totalTime = minutes * 60;
  timeLeft = totalTime;
  updateTexts();
  updateDisplay();
}

function handleSessionEnd() {
  if (mode === "focus") {
    alert("Focus session finished. Time for a break.");
    cycle++;
    setMode("shortBreak", 5);
  } else {
    alert("Break finished. Ready for another session?");
    setMode("focus", 25);
  }
}

updateTexts();
updateDisplay();
</script>
