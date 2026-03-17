---
title: "Sudoku"
permalink: /sudoku/
classes: wide
---

<style>
  :root {
    --sudoku-bg: #091225;
    --sudoku-panel: rgba(10, 22, 46, 0.96);
    --sudoku-panel-soft: rgba(20, 34, 61, 0.92);
    --sudoku-cell: #1b2a45;
    --sudoku-cell-active: #243a63;
    --sudoku-cell-fixed: #13213b;
    --sudoku-cell-error: #5f2330;
    --sudoku-text: #edf2f7;
    --sudoku-muted: #a9b6c9;
    --sudoku-accent: #6dd3ff;
    --sudoku-border: rgba(182, 198, 220, 0.18);
    --sudoku-border-strong: rgba(226, 232, 240, 0.9);
    --sudoku-shadow: 0 18px 42px rgba(0, 0, 0, 0.22);
  }

  .sudoku-page,
  .sudoku-page * {
    box-sizing: border-box;
  }

  .sudoku-page {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    color: var(--sudoku-text);
  }

  .sudoku-page p {
    margin-top: 0;
  }

  .sudoku-shell {
    display: grid;
    gap: 1rem;
  }

  .sudoku-panel {
    background: var(--sudoku-panel);
    border: 1px solid var(--sudoku-border);
    border-radius: 24px;
    box-shadow: var(--sudoku-shadow);
    overflow: hidden;
  }

  .sudoku-topbar {
    padding: 1rem 1.1rem;
  }

  .sudoku-topbar-inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
    align-items: end;
  }

  .sudoku-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: end;
  }

  .sudoku-field {
    display: grid;
    gap: 0.35rem;
    min-width: 160px;
  }

  .sudoku-field label {
    font-size: 0.95rem;
    color: var(--sudoku-muted);
  }

  .sudoku-status {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
    color: var(--sudoku-muted);
    font-size: 1rem;
  }

  .sudoku-select,
  .sudoku-btn {
    appearance: none;
    width: auto;
    min-width: 0;
    max-width: 100%;
    border: 1px solid var(--sudoku-border);
    background: var(--sudoku-panel-soft);
    color: var(--sudoku-text);
    border-radius: 16px;
    padding: 0.82rem 1rem;
    font: inherit;
    line-height: 1.2;
  }

  .sudoku-select {
    min-width: 170px;
  }

  .sudoku-btn {
    cursor: pointer;
    transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease;
  }

  .sudoku-btn:hover {
    transform: translateY(-1px);
    border-color: rgba(109, 211, 255, 0.5);
  }

  .sudoku-btn-primary {
    background: linear-gradient(135deg, #1d6fd1, #2784f1);
    border-color: transparent;
  }

  .sudoku-main {
    display: grid;
    grid-template-columns: minmax(520px, 1.35fr) minmax(320px, 0.9fr);
    gap: 1.25rem;
    align-items: start;
  }

  .sudoku-board-panel {
    padding: 1.1rem;
  }

  .sudoku-board-wrap {
    width: 100%;
    max-width: 920px;
    margin: 0 auto;
    aspect-ratio: 1 / 1;
  }

  .sudoku-board {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    width: 100%;
    height: 100%;
    background: var(--sudoku-border-strong);
    border: 4px solid var(--sudoku-border-strong);
    border-radius: 24px;
    overflow: hidden;
  }

  .sudoku-cell {
    position: relative;
    border: 1px solid rgba(210, 221, 238, 0.8);
    background: var(--sudoku-cell);
    color: var(--sudoku-text);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(1.2rem, 2vw, 2rem);
    font-weight: 700;
    padding: 0;
    cursor: pointer;
    min-width: 0;
    outline: none;
  }

  .sudoku-cell.fixed {
    background: var(--sudoku-cell-fixed);
  }

  .sudoku-cell.related {
    background: #20304d;
  }

  .sudoku-cell.active {
    background: var(--sudoku-cell-active);
  }

  .sudoku-cell.same-number {
    color: var(--sudoku-accent);
  }

  .sudoku-cell.error {
    background: var(--sudoku-cell-error);
    color: #ffd9df;
  }

  .sudoku-cell:nth-child(3n) {
    border-right: 3px solid var(--sudoku-border-strong);
  }

  .sudoku-cell:nth-child(9n) {
    border-right: 1px solid rgba(210, 221, 238, 0.8);
  }

  .sudoku-cell:nth-child(n + 19):nth-child(-n + 27),
  .sudoku-cell:nth-child(n + 46):nth-child(-n + 54) {
    border-bottom: 3px solid var(--sudoku-border-strong);
  }

  .sudoku-notes {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 0.12rem;
    font-size: clamp(0.45rem, 0.8vw, 0.75rem);
    font-weight: 500;
    color: #cfd8e7;
  }

  .sudoku-notes span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sudoku-sidebar {
    display: grid;
    gap: 1.25rem;
    min-width: 0;
    align-content: start;
  }

  .sudoku-card {
    background: var(--sudoku-panel);
    border: 1px solid var(--sudoku-border);
    border-radius: 24px;
    box-shadow: var(--sudoku-shadow);
    padding: 1.4rem;
    min-width: 0;
  }

  .sudoku-card h2,
  .sudoku-card h3 {
    margin: 0 0 0.9rem;
    font-size: clamp(1.4rem, 2.4vw, 2rem);
  }

  .sudoku-divider {
    height: 1px;
    background: var(--sudoku-border);
    margin-bottom: 1rem;
  }

  .sudoku-number-pad,
  .sudoku-actions {
    display: grid;
    gap: 0.75rem;
    min-width: 0;
  }

  .sudoku-number-pad {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .sudoku-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sudoku-number-pad .sudoku-btn,
  .sudoku-actions .sudoku-btn,
  .sudoku-mode-toggle .sudoku-btn {
    width: 100%;
    min-width: 0;
    justify-content: center;
    text-align: center;
    padding-inline: 0.8rem;
  }

  .sudoku-number-pad .sudoku-btn {
    min-height: 110px;
    font-size: 1.45rem;
    font-weight: 700;
  }

  .sudoku-actions .sudoku-btn {
    min-height: 76px;
    font-size: 1.15rem;
  }

  .sudoku-mode-toggle {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 1rem;
  }

  .sudoku-mode-toggle h3 {
    margin: 0;
    font-size: clamp(1.2rem, 2vw, 1.6rem);
  }

  .sudoku-btn.active-toggle {
    border-color: rgba(109, 211, 255, 0.55);
    color: #dff7ff;
  }

  .sudoku-message {
    min-height: 1.5rem;
    margin: 0;
    color: #cae4ff;
    line-height: 1.5;
  }

  .sudoku-message.error {
    color: #ffd2d8;
  }

  .sudoku-message.success {
    color: #d8ffe3;
  }

  .sudoku-legend {
    color: var(--sudoku-muted);
    line-height: 1.7;
    font-size: 0.96rem;
  }

  @media (max-width: 1100px) {
    .sudoku-topbar-inner {
      grid-template-columns: 1fr;
      align-items: start;
    }

    .sudoku-status {
      justify-content: flex-start;
    }

    .sudoku-main {
      grid-template-columns: 1fr;
    }

    .sudoku-board-wrap {
      max-width: 760px;
    }
  }

  @media (max-width: 640px) {
    .sudoku-topbar,
    .sudoku-board-panel,
    .sudoku-card {
      padding: 0.9rem;
    }

    .sudoku-controls {
      display: grid;
      grid-template-columns: 1fr;
    }

    .sudoku-field,
    .sudoku-select,
    .sudoku-controls .sudoku-btn {
      width: 100%;
    }

    .sudoku-mode-toggle {
      grid-template-columns: 1fr;
    }

    .sudoku-number-pad .sudoku-btn {
      min-height: 74px;
    }

    .sudoku-actions {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="sudoku-page">
  <div class="sudoku-shell">
    <section class="sudoku-panel sudoku-topbar">
      <div class="sudoku-topbar-inner">
        <div class="sudoku-controls">
          <div class="sudoku-field">
            <label for="difficulty">Difficulty</label>
            <select id="difficulty" class="sudoku-select">
              <option value="easy">Easy</option>
              <option value="medium" selected>Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button id="new-game" class="sudoku-btn sudoku-btn-primary">New Game</button>
          <button id="check-board" class="sudoku-btn">Check</button>
          <button id="solve-board" class="sudoku-btn">Solve</button>
        </div>

        <div class="sudoku-status">
          <span>⏱ <strong id="timer">00:00</strong></span>
          <span>❌ Mistakes: <strong id="mistakes">0</strong></span>
          <span>🏆 Best time: <strong id="best-time">–</strong></span>
        </div>
      </div>
    </section>

    <section class="sudoku-main">
      <div class="sudoku-panel sudoku-board-panel">
        <div class="sudoku-board-wrap">
          <div id="board" class="sudoku-board" aria-label="Sudoku board"></div>
        </div>
      </div>

      <aside class="sudoku-sidebar">
        <section class="sudoku-card">
          <h2>Input</h2>
          <div class="sudoku-divider"></div>
          <div id="number-pad" class="sudoku-number-pad"></div>
        </section>

        <section class="sudoku-card">
          <div class="sudoku-mode-toggle">
            <h3>Modes</h3>
            <button id="notes-toggle" class="sudoku-btn">Notes: Off</button>
          </div>
          <div class="sudoku-actions">
            <button id="erase-cell" class="sudoku-btn">Clear Cell</button>
            <button id="hint-btn" class="sudoku-btn">Hint</button>
            <button id="undo-btn" class="sudoku-btn">Undo</button>
            <button id="reset-btn" class="sudoku-btn">Reset</button>
          </div>
        </section>

        <section class="sudoku-card">
          <h3>Status</h3>
          <p id="message" class="sudoku-message">Select a cell and start playing.</p>
        </section>

        <section class="sudoku-card sudoku-legend">
          <strong>Tips:</strong><br>
          • Enter numbers with the keyboard using 1–9<br>
          • Backspace/Delete clears a cell<br>
          • Press N to toggle notes mode<br>
          • Progress is automatically saved in your browser
        </section>
      </aside>
    </section>
  </div>
</div>

<script>
(() => {
  const boardEl = document.getElementById('board');
  const numberPadEl = document.getElementById('number-pad');
  const difficultyEl = document.getElementById('difficulty');
  const timerEl = document.getElementById('timer');
  const mistakesEl = document.getElementById('mistakes');
  const bestTimeEl = document.getElementById('best-time');
  const messageEl = document.getElementById('message');
  const notesToggleEl = document.getElementById('notes-toggle');

  const STORAGE_KEY = 'jackiesblog-sudoku-state-en-v1';
  const BEST_KEY = 'jackiesblog-sudoku-best-times-en-v1';

  let solution = [];
  let puzzle = [];
  let board = [];
  let notes = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
  let fixed = Array.from({ length: 9 }, () => Array(9).fill(false));
  let selected = { row: 0, col: 0 };
  let notesMode = false;
  let mistakes = 0;
  let timer = 0;
  let timerId = null;
  let undoStack = [];
  let currentDifficulty = 'medium';

  const difficultyMap = {
    easy: 40,
    medium: 32,
    hard: 26,
  };

  function deepCopyGrid(grid) {
    return grid.map(row => [...row]);
  }

  function createEmptyGrid() {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (grid[r][c] === num) return false;
      }
    }

    return true;
  }

  function fillGrid(grid) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] !== 0) continue;

        for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (!isValid(grid, row, col, num)) continue;
          grid[row][col] = num;
          if (fillGrid(grid)) return true;
          grid[row][col] = 0;
        }

        return false;
      }
    }

    return true;
  }

  function countSolutions(grid) {
    let count = 0;

    function solve() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] !== 0) continue;

          for (let num = 1; num <= 9; num++) {
            if (!isValid(grid, row, col, num)) continue;
            grid[row][col] = num;
            solve();
            grid[row][col] = 0;
            if (count > 1) return;
          }

          return;
        }
      }

      count += 1;
    }

    solve();
    return count;
  }

  function generatePuzzle(clues) {
    const full = createEmptyGrid();
    fillGrid(full);
    const puzzleGrid = deepCopyGrid(full);
    const cells = shuffle(Array.from({ length: 81 }, (_, i) => i));
    let remaining = 81;

    for (const index of cells) {
      if (remaining <= clues) break;
      const row = Math.floor(index / 9);
      const col = index % 9;
      const backup = puzzleGrid[row][col];
      puzzleGrid[row][col] = 0;

      const probe = deepCopyGrid(puzzleGrid);
      if (countSolutions(probe) !== 1) {
        puzzleGrid[row][col] = backup;
      } else {
        remaining -= 1;
      }
    }

    return { puzzle: puzzleGrid, solution: full };
  }

  function loadBestTimes() {
    try {
      return JSON.parse(localStorage.getItem(BEST_KEY)) || {};
    } catch {
      return {};
    }
  }

  function saveBestTime() {
    const bestTimes = loadBestTimes();
    if (typeof bestTimes[currentDifficulty] !== 'number' || timer < bestTimes[currentDifficulty]) {
      bestTimes[currentDifficulty] = timer;
      localStorage.setItem(BEST_KEY, JSON.stringify(bestTimes));
    }
  }

  function updateBestTimeDisplay() {
    const bestTimes = loadBestTimes();
    const best = bestTimes[currentDifficulty];
    bestTimeEl.textContent = typeof best === 'number' ? formatTime(best) : '–';
  }

  function saveState() {
    const payload = {
      solution,
      puzzle,
      board,
      fixed,
      selected,
      notes: notes.map(row => row.map(set => [...set])),
      notesMode,
      mistakes,
      timer,
      difficulty: currentDifficulty,
      undoStack,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !data.board || !data.solution) return false;

      solution = data.solution;
      puzzle = data.puzzle;
      board = data.board;
      fixed = data.fixed;
      selected = data.selected || { row: 0, col: 0 };
      notes = (data.notes || []).map(row => row.map(items => new Set(items)));
      notesMode = Boolean(data.notesMode);
      mistakes = data.mistakes || 0;
      timer = data.timer || 0;
      currentDifficulty = data.difficulty || 'medium';
      undoStack = Array.isArray(data.undoStack) ? data.undoStack : [];
      difficultyEl.value = currentDifficulty;
      return true;
    } catch {
      return false;
    }
  }

  function formatTime(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function startTimer() {
    stopTimer();
    timerId = setInterval(() => {
      timer += 1;
      timerEl.textContent = formatTime(timer);
      saveState();
    }, 1000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function setMessage(text, type = '') {
    messageEl.textContent = text;
    messageEl.className = `sudoku-message ${type}`.trim();
  }

  function sameBox(aRow, aCol, bRow, bCol) {
    return Math.floor(aRow / 3) === Math.floor(bRow / 3) && Math.floor(aCol / 3) === Math.floor(bCol / 3);
  }

  function hasConflict(row, col, value) {
    if (!value) return false;

    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === value) return true;
      if (i !== row && board[i][col] === value) return true;
    }

    const sr = Math.floor(row / 3) * 3;
    const sc = Math.floor(col / 3) * 3;
    for (let r = sr; r < sr + 3; r++) {
      for (let c = sc; c < sc + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === value) return true;
      }
    }

    return false;
  }

  function createNumberPad() {
    numberPadEl.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sudoku-btn';
      button.textContent = i;
      button.addEventListener('click', () => handleInput(i));
      numberPadEl.appendChild(button);
    }
  }

  function renderBoard() {
    boardEl.innerHTML = '';
    const activeValue = board[selected.row]?.[selected.col] || 0;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'sudoku-cell';
        button.setAttribute('aria-label', `Row ${row + 1}, column ${col + 1}`);

        const value = board[row][col];
        const isSelected = row === selected.row && col === selected.col;
        const isRelated = row === selected.row || col === selected.col || sameBox(row, col, selected.row, selected.col);
        const isSameNumber = activeValue && value === activeValue;

        if (fixed[row][col]) button.classList.add('fixed');
        if (isRelated) button.classList.add('related');
        if (isSelected) button.classList.add('active');
        if (isSameNumber) button.classList.add('same-number');
        if (hasConflict(row, col, value)) button.classList.add('error');

        if (value !== 0) {
          button.textContent = value;
        } else if (notes[row][col].size) {
          const notesWrap = document.createElement('div');
          notesWrap.className = 'sudoku-notes';
          for (let n = 1; n <= 9; n++) {
            const note = document.createElement('span');
            note.textContent = notes[row][col].has(n) ? String(n) : '';
            notesWrap.appendChild(note);
          }
          button.appendChild(notesWrap);
        }

        button.addEventListener('click', () => {
          selected = { row, col };
          renderBoard();
          saveState();
        });

        boardEl.appendChild(button);
      }
    }

    timerEl.textContent = formatTime(timer);
    mistakesEl.textContent = String(mistakes);
    notesToggleEl.textContent = `Notes: ${notesMode ? 'On' : 'Off'}`;
    notesToggleEl.classList.toggle('active-toggle', notesMode);
    updateBestTimeDisplay();
  }

  function pushUndo() {
    undoStack.push({
      board: deepCopyGrid(board),
      notes: notes.map(row => row.map(set => [...set])),
      mistakes,
    });

    if (undoStack.length > 100) undoStack.shift();
  }

  function toggleNote(row, col, num) {
    if (notes[row][col].has(num)) {
      notes[row][col].delete(num);
    } else {
      notes[row][col].add(num);
    }
  }

  function clearRelatedNotes(row, col, value) {
    for (let i = 0; i < 9; i++) {
      notes[row][i].delete(value);
      notes[i][col].delete(value);
    }

    const sr = Math.floor(row / 3) * 3;
    const sc = Math.floor(col / 3) * 3;
    for (let r = sr; r < sr + 3; r++) {
      for (let c = sc; c < sc + 3; c++) {
        notes[r][c].delete(value);
      }
    }
  }

  function handleInput(num) {
    const { row, col } = selected;
    if (fixed[row][col]) {
      setMessage('This cell is locked and cannot be changed.', 'error');
      return;
    }

    pushUndo();

    if (notesMode) {
      if (board[row][col] !== 0) {
        setMessage('Notes only work in empty cells.', 'error');
        return;
      }
      toggleNote(row, col, num);
      setMessage(`Note ${num} ${notes[row][col].has(num) ? 'added' : 'removed'}.`);
    } else {
      board[row][col] = num;
      notes[row][col].clear();
      clearRelatedNotes(row, col, num);

      if (solution[row][col] !== num) {
        mistakes += 1;
        setMessage(`${num} does not fit there yet.`, 'error');
      } else {
        setMessage(`${num} was placed.`);
      }
    }

    renderBoard();
    saveState();
    checkWin();
  }

  function eraseSelected() {
    const { row, col } = selected;
    if (fixed[row][col]) return;
    pushUndo();
    board[row][col] = 0;
    notes[row][col].clear();
    setMessage('Cell cleared.');
    renderBoard();
    saveState();
  }

  function resetBoard() {
    board = deepCopyGrid(puzzle);
    notes = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
    mistakes = 0;
    timer = 0;
    undoStack = [];
    setMessage('The Sudoku board was reset.');
    startTimer();
    renderBoard();
    saveState();
  }

  function undoMove() {
    const previous = undoStack.pop();
    if (!previous) {
      setMessage('There is nothing to undo.');
      return;
    }

    board = previous.board;
    notes = previous.notes.map(row => row.map(items => new Set(items)));
    mistakes = previous.mistakes;
    setMessage('Last move undone.');
    renderBoard();
    saveState();
  }

  function hint() {
    const emptyCells = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) emptyCells.push({ row, col });
      }
    }

    if (!emptyCells.length) {
      setMessage('There are no empty cells left.', 'error');
      return;
    }

    pushUndo();
    const pick = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[pick.row][pick.col] = solution[pick.row][pick.col];
    notes[pick.row][pick.col].clear();
    selected = pick;
    setMessage('A correct cell was revealed.');
    renderBoard();
    saveState();
    checkWin();
  }

  function checkBoard() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== 0 && board[row][col] !== solution[row][col]) {
          setMessage('There is still at least one mistake on the board.', 'error');
          renderBoard();
          return;
        }
      }
    }

    setMessage('All entered numbers are currently correct.', 'success');
    renderBoard();
  }

  function solveBoard() {
    board = deepCopyGrid(solution);
    stopTimer();
    setMessage('The Sudoku puzzle was fully solved.', 'success');
    renderBoard();
    saveState();
  }

  function checkWin() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== solution[row][col]) return;
      }
    }

    stopTimer();
    saveBestTime();
    setMessage('Congratulations! You solved the Sudoku puzzle. 🎉', 'success');
    renderBoard();
    saveState();
  }

  function difficultyLabel(value) {
    if (value === 'easy') return 'easy';
    if (value === 'hard') return 'hard';
    return 'medium';
  }

  function newGame(difficulty = difficultyEl.value) {
    currentDifficulty = difficulty;
    const clues = difficultyMap[currentDifficulty] || difficultyMap.medium;
    const created = generatePuzzle(clues);
    puzzle = created.puzzle;
    solution = created.solution;
    board = deepCopyGrid(puzzle);
    fixed = puzzle.map(row => row.map(value => value !== 0));
    notes = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
    selected = { row: 0, col: 0 };
    notesMode = false;
    mistakes = 0;
    timer = 0;
    undoStack = [];
    setMessage(`A new ${difficultyLabel(currentDifficulty)} Sudoku puzzle was created.`);
    startTimer();
    renderBoard();
    saveState();
  }

  function moveSelection(dx, dy) {
    selected.row = (selected.row + dy + 9) % 9;
    selected.col = (selected.col + dx + 9) % 9;
    renderBoard();
    saveState();
  }

  document.getElementById('new-game').addEventListener('click', () => newGame());
  document.getElementById('check-board').addEventListener('click', checkBoard);
  document.getElementById('solve-board').addEventListener('click', solveBoard);
  document.getElementById('erase-cell').addEventListener('click', eraseSelected);
  document.getElementById('hint-btn').addEventListener('click', hint);
  document.getElementById('undo-btn').addEventListener('click', undoMove);
  document.getElementById('reset-btn').addEventListener('click', resetBoard);

  notesToggleEl.addEventListener('click', () => {
    notesMode = !notesMode;
    setMessage(`Notes mode is now ${notesMode ? 'enabled' : 'disabled'}.`);
    renderBoard();
    saveState();
  });

  difficultyEl.addEventListener('change', () => {
    currentDifficulty = difficultyEl.value;
    updateBestTimeDisplay();
    saveState();
  });

  window.addEventListener('keydown', event => {
    if (/^[1-9]$/.test(event.key)) {
      handleInput(Number(event.key));
      return;
    }

    switch (event.key) {
      case 'Backspace':
      case 'Delete':
      case '0':
        eraseSelected();
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveSelection(0, -1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveSelection(0, 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        moveSelection(-1, 0);
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveSelection(1, 0);
        break;
      case 'n':
      case 'N':
        notesMode = !notesMode;
        renderBoard();
        saveState();
        break;
    }
  });

  createNumberPad();

  if (loadState()) {
    setMessage('Saved Sudoku game loaded.');
    renderBoard();
    startTimer();
  } else {
    newGame('medium');
  }
})();
</script>
