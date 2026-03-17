---
title: "Sudoku"
permalink: /sudoku/
---

<style>
  :root {
    --sudoku-bg: #0f172a;
    --sudoku-panel: #111827;
    --sudoku-panel-2: #1f2937;
    --sudoku-text: #e5e7eb;
    --sudoku-muted: #94a3b8;
    --sudoku-accent: #38bdf8;
    --sudoku-accent-2: #22c55e;
    --sudoku-danger: #ef4444;
    --sudoku-cell: #0b1220;
    --sudoku-cell-fixed: #172033;
    --sudoku-cell-active: #1d4ed8;
    --sudoku-cell-related: #1e293b;
    --sudoku-cell-error: #7f1d1d;
    --sudoku-border: #334155;
  }

  .sudoku-app,
  .sudoku-app * { box-sizing: border-box; }

  .sudoku-app {
    max-width: 1100px;
    margin: 1.5rem auto 0;
    color: var(--sudoku-text);
  }

  .sudoku-hero {
    margin-bottom: 1.25rem;
  }

  .sudoku-hero h1 {
    margin: 0 0 0.4rem;
    font-size: clamp(2rem, 4vw, 2.8rem);
  }

  .sudoku-hero p {
    margin: 0;
    color: var(--sudoku-muted);
    line-height: 1.6;
  }

  .sudoku-panel {
    background: rgba(17, 24, 39, 0.94);
    border: 1px solid rgba(148, 163, 184, 0.16);
    border-radius: 20px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
    overflow: hidden;
  }

  .sudoku-topbar {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 1rem;
  }

  .sudoku-controls,
  .sudoku-status {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
  }

  .sudoku-status {
    color: var(--sudoku-muted);
    font-size: 0.95rem;
  }

  .sudoku-app select,
  .sudoku-app button {
    border: 1px solid var(--sudoku-border);
    background: var(--sudoku-panel-2);
    color: var(--sudoku-text);
    border-radius: 12px;
    padding: 0.7rem 0.95rem;
    font: inherit;
  }

  .sudoku-app button {
    cursor: pointer;
    transition: transform 0.15s ease, border-color 0.15s ease;
  }

  .sudoku-app button:hover {
    transform: translateY(-1px);
    border-color: var(--sudoku-accent);
  }

  .sudoku-app button.primary {
    background: linear-gradient(135deg, #0369a1, #2563eb);
    border-color: transparent;
  }

  .sudoku-layout {
    display: grid;
    grid-template-columns: minmax(280px, 560px) minmax(260px, 1fr);
    gap: 1rem;
    align-items: start;
  }
  
  .sudoku-layout > * {
  min-width: 0;
  width: 100%;
  }

  .sudoku-board-wrap {
    padding: 1rem;
  }

  .sudoku-board {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    width: 100%;
    aspect-ratio: 1 / 1;
    border: 3px solid #cbd5e1;
    border-radius: 16px;
    overflow: hidden;
    background: #cbd5e1;
  }

  .sudoku-cell {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--sudoku-border);
    background: var(--sudoku-cell);
    color: var(--sudoku-text);
    font-size: clamp(1rem, 2.5vw, 1.6rem);
    font-weight: 700;
    user-select: none;
    outline: none;
    cursor: pointer;
    min-width: 0;
  }

  .sudoku-cell.fixed { background: var(--sudoku-cell-fixed); color: #f8fafc; }
  .sudoku-cell.active { background: var(--sudoku-cell-active); }
  .sudoku-cell.related { background: var(--sudoku-cell-related); }
  .sudoku-cell.same-number { color: #7dd3fc; }
  .sudoku-cell.error { background: var(--sudoku-cell-error); color: #fecaca; }

  .sudoku-cell:nth-child(3n) { border-right: 2px solid #cbd5e1; }
  .sudoku-cell:nth-child(9n) { border-right: 1px solid var(--sudoku-border); }
  .sudoku-cell:nth-child(n+19):nth-child(-n+27),
  .sudoku-cell:nth-child(n+46):nth-child(-n+54) {
    border-bottom: 2px solid #cbd5e1;
  }

  .sudoku-notes {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    padding: 0.1rem;
    font-size: clamp(0.45rem, 1.1vw, 0.72rem);
    color: #cbd5e1;
    font-weight: 500;
  }

  .sudoku-notes span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sudoku-sidebar {
  padding: 1rem;
  display: grid;
  gap: 1rem;
  align-content: start;
  width: 100%;
  }

  .sudoku-card {
  padding: 1rem;
  border-radius: 16px;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(148, 163, 184, 0.12);
  width: 100%;
  overflow: hidden;
  }

  .sudoku-card h2,
  .sudoku-card h3 {
    margin-top: 0;
  }

  .sudoku-number-pad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
  }

  .sudoku-number-pad button {
    min-height: 52px;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .sudoku-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
  }

  .sudoku-toggle {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    justify-content: space-between;
  }

  .sudoku-app button.active-toggle {
    border-color: var(--sudoku-accent-2);
    color: #dcfce7;
  }

  .sudoku-message {
    min-height: 1.5rem;
    color: #bfdbfe;
  }

  .sudoku-message.error { color: #fecaca; }
  .sudoku-message.success { color: #bbf7d0; }

  .sudoku-legend {
    color: var(--sudoku-muted);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  @media (max-width: 860px) {
    .sudoku-layout {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="sudoku-app">
  <section class="sudoku-hero">
    <p>Dieses browserbasiertes Sudoku-Spiel läuft komplett ohne Backend, speichert den Fortschritt lokal und bietet Notizen, Tipps und drei Schwierigkeitsgrade.</p>
  </section>

  <section class="sudoku-panel sudoku-topbar">
    <div class="sudoku-controls">
      <label>
        Schwierigkeit
        <select id="difficulty">
          <option value="easy">Leicht</option>
          <option value="medium" selected>Mittel</option>
          <option value="hard">Schwer</option>
        </select>
      </label>
      <button id="new-game" class="primary">Neues Spiel</button>
      <button id="check-board">Prüfen</button>
      <button id="solve-board">Lösen</button>
    </div>
    <div class="sudoku-status">
      <span>⏱ <strong id="timer">00:00</strong></span>
      <span>❌ Fehler: <strong id="mistakes">0</strong></span>
      <span>🏆 Bestzeit: <strong id="best-time">–</strong></span>
    </div>
  </section>

  <section class="sudoku-layout">
    <div class="sudoku-panel sudoku-board-wrap">
      <div id="board" class="sudoku-board" aria-label="Sudoku Spielfeld"></div>
    </div>

    <aside class="sudoku-panel sudoku-sidebar">
      <div class="sudoku-card">
        <h2>Eingabe</h2>
        <div class="sudoku-number-pad" id="number-pad"></div>
      </div>

      <div class="sudoku-card">
        <div class="sudoku-toggle">
          <h3>Modi</h3>
          <button id="notes-toggle">Notizen: Aus</button>
        </div>
        <div class="sudoku-actions" style="margin-top: 0.8rem;">
          <button id="erase-cell">Feld leeren</button>
          <button id="hint-btn">Tipp</button>
          <button id="undo-btn">Rückgängig</button>
          <button id="reset-btn">Zurücksetzen</button>
        </div>
      </div>

      <div class="sudoku-card">
        <h3>Status</h3>
        <p id="message" class="sudoku-message">Wähle ein Feld aus und beginne.</p>
      </div>

      <div class="sudoku-card sudoku-legend">
        <strong>Hinweise:</strong><br>
        • Zahlen mit Tastatur 1–9 eingeben<br>
        • Backspace/Delete leert ein Feld<br>
        • Mit N den Notizmodus umschalten<br>
        • Fortschritt wird automatisch im Browser gespeichert
      </div>
    </aside>
  </section>
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

  const STORAGE_KEY = 'jackiesblog-sudoku-state-v1';
  const BEST_KEY = 'jackiesblog-sudoku-best-times-v1';

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

  function emptyGrid() {
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
        if (grid[row][col] === 0) {
          for (const num of shuffle([1,2,3,4,5,6,7,8,9])) {
            if (isValid(grid, row, col, num)) {
              grid[row][col] = num;
              if (fillGrid(grid)) return true;
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  function countSolutions(grid) {
    let count = 0;

    function solve() {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                solve();
                grid[row][col] = 0;
              }
            }
            return;
          }
        }
      }
      count++;
    }

    solve();
    return count;
  }

  function generatePuzzle(clues) {
    const full = emptyGrid();
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
      const copy = deepCopyGrid(puzzleGrid);
      if (countSolutions(copy) !== 1) {
        puzzleGrid[row][col] = backup;
      } else {
        remaining--;
      }
    }

    return { puzzle: puzzleGrid, solution: full };
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

  function loadBestTimes() {
    try {
      return JSON.parse(localStorage.getItem(BEST_KEY)) || {};
    } catch {
      return {};
    }
  }

  function updateBestTimeDisplay() {
    const bestTimes = loadBestTimes();
    const best = bestTimes[currentDifficulty];
    bestTimeEl.textContent = typeof best === 'number' ? formatTime(best) : '–';
  }

  function setMessage(text, type = '') {
    messageEl.textContent = text;
    messageEl.className = `sudoku-message ${type}`.trim();
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

  function createNumberPad() {
    numberPadEl.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = i;
      btn.addEventListener('click', () => handleInput(i));
      numberPadEl.appendChild(btn);
    }
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

  function renderBoard() {
    boardEl.innerHTML = '';
    const activeValue = board[selected.row]?.[selected.col] || 0;

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'sudoku-cell';
        const value = board[row][col];
        const isSelected = row === selected.row && col === selected.col;
        const isRelated = row === selected.row || col === selected.col || sameBox(row, col, selected.row, selected.col);
        const isSameNumber = activeValue && value === activeValue;

        if (fixed[row][col]) cell.classList.add('fixed');
        if (isRelated) cell.classList.add('related');
        if (isSelected) cell.classList.add('active');
        if (isSameNumber) cell.classList.add('same-number');
        if (hasConflict(row, col, value)) cell.classList.add('error');

        if (value !== 0) {
          cell.textContent = value;
        } else if (notes[row][col].size) {
          const notesWrap = document.createElement('div');
          notesWrap.className = 'sudoku-notes';
          for (let n = 1; n <= 9; n++) {
            const span = document.createElement('span');
            span.textContent = notes[row][col].has(n) ? String(n) : '';
            notesWrap.appendChild(span);
          }
          cell.appendChild(notesWrap);
        }

        cell.addEventListener('click', () => {
          selected = { row, col };
          renderBoard();
          saveState();
        });

        boardEl.appendChild(cell);
      }
    }

    timerEl.textContent = formatTime(timer);
    mistakesEl.textContent = String(mistakes);
    notesToggleEl.textContent = `Notizen: ${notesMode ? 'An' : 'Aus'}`;
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
      setMessage('Dieses Feld ist vorgegeben und kann nicht geändert werden.', 'error');
      return;
    }

    pushUndo();

    if (notesMode) {
      if (board[row][col] !== 0) {
        setMessage('Notizen funktionieren nur in leeren Feldern.', 'error');
        return;
      }
      toggleNote(row, col, num);
      setMessage(`Notiz ${num} ${notes[row][col].has(num) ? 'hinzugefügt' : 'entfernt'}.`);
    } else {
      board[row][col] = num;
      notes[row][col].clear();
      clearRelatedNotes(row, col, num);

      if (solution[row][col] !== num) {
        mistakes += 1;
        setMessage(`Die ${num} passt dort noch nicht.`, 'error');
      } else {
        setMessage(`Die ${num} wurde gesetzt.`);
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
    setMessage('Feld geleert.');
    renderBoard();
    saveState();
  }

  function resetBoard() {
    board = deepCopyGrid(puzzle);
    notes = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
    mistakes = 0;
    undoStack = [];
    timer = 0;
    setMessage('Das Sudoku wurde zurückgesetzt.');
    startTimer();
    renderBoard();
    saveState();
  }

  function undoMove() {
    const previous = undoStack.pop();
    if (!previous) {
      setMessage('Es gibt nichts zum Rückgängigmachen.');
      return;
    }
    board = previous.board;
    notes = previous.notes.map(row => row.map(items => new Set(items)));
    mistakes = previous.mistakes;
    setMessage('Letzter Zug zurückgenommen.');
    renderBoard();
    saveState();
  }

  function hint() {
    const empties = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) empties.push({ row, col });
      }
    }
    if (!empties.length) {
      setMessage('Es gibt keine leeren Felder mehr.');
      return;
    }
    pushUndo();
    const pick = empties[Math.floor(Math.random() * empties.length)];
    board[pick.row][pick.col] = solution[pick.row][pick.col];
    notes[pick.row][pick.col].clear();
    selected = pick;
    setMessage('Ein korrektes Feld wurde aufgedeckt.');
    renderBoard();
    saveState();
    checkWin();
  }

  function checkBoard() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] !== 0 && board[row][col] !== solution[row][col]) {
          setMessage('Es gibt noch mindestens einen Fehler im Spielfeld.', 'error');
          renderBoard();
          return;
        }
      }
    }
    setMessage('Alle eingetragenen Zahlen sind aktuell korrekt.', 'success');
    renderBoard();
  }

  function solveBoard() {
    board = deepCopyGrid(solution);
    stopTimer();
    setMessage('Das Sudoku wurde vollständig gelöst.', 'success');
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
    const bestTimes = loadBestTimes();
    if (typeof bestTimes[currentDifficulty] !== 'number' || timer < bestTimes[currentDifficulty]) {
      bestTimes[currentDifficulty] = timer;
      localStorage.setItem(BEST_KEY, JSON.stringify(bestTimes));
    }
    setMessage('Glückwunsch! Du hast das Sudoku gelöst. 🎉', 'success');
    renderBoard();
    saveState();
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
    setMessage(`Neues ${difficultyLabel(currentDifficulty)}-Sudoku erstellt.`);
    startTimer();
    renderBoard();
    saveState();
  }

  function difficultyLabel(key) {
    return key === 'easy' ? 'leichtes' : key === 'hard' ? 'schweres' : 'mittleres';
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
    setMessage(`Notizmodus ist jetzt ${notesMode ? 'aktiv' : 'deaktiviert'}.`);
    renderBoard();
    saveState();
  });

  difficultyEl.addEventListener('change', () => {
    currentDifficulty = difficultyEl.value;
    updateBestTimeDisplay();
    saveState();
  });

  window.addEventListener('keydown', (event) => {
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
    setMessage('Gespeichertes Sudoku geladen.');
    renderBoard();
    startTimer();
  } else {
    newGame('medium');
  }
})();
</script>
