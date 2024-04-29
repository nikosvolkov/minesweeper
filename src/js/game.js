import { createBoard } from './board';
import { boardParameters } from './consts';
import { createBottomButtons } from './ui';
import { getBoard2dArray, stopWatchHandler } from './utils';

const minesLocation = [];
let firstClick = true;
const rows = boardParameters.rows;
const columns = boardParameters.columns;
let minesCount = boardParameters.mines;
let flagsLeft = minesCount;

export const startgame = (event) => {
  if (event && event.target.id == 'start-game-btn'){
    document.getElementById('start-game-btn').remove();
    document.getElementById('settings-btn').remove();
  }
  

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('time-flag-container');
  infoDiv.innerHTML = `<span id="flags-left">🚩=${flagsLeft}</span><span id="stopwatch">⏱:000</span>`;
  document.getElementById('app').prepend(infoDiv);

  const board = createBoard();
  board.forEach(() => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        board[r][c].addEventListener('click', cellClicked);
        board[r][c].addEventListener('mousedown', longClickHandler);
        board[r][c].addEventListener('mouseup', resetLongClick);
      }
    }
  });
  createBottomButtons();
};

export const restartGame = () => {
  const gameDiv = document.getElementById('app');
  gameDiv.innerHTML = '';
  minesCount = boardParameters.mines
  minesLocation.length = 0;
  firstClick = true;
  flagsLeft = minesCount;

  stopWatchHandler('stop')
  startgame();
};

let timer = null;
function longClickHandler(event) {
  // if ('ontouchstart' in document.body && event.cancelable == true && event.target.tagName == 'BUTTON') {
  //   event.preventDefault();
  // }

  timer = setTimeout(() => {}, 500);
}

function resetLongClick() {
  clearTimeout(timer);
}

function cellClicked() {
  let cell = this;

  const flagButton = document.getElementById('flag-btn');
  if (flagButton.classList.contains('flag-btn-active')) {
    if (!cell.innerText && cell.classList.contains('board-cell')) {
      cell.innerText = '🚩';
      flagsLeft--;
    } else if (cell.innerText == '🚩') {
      cell.innerText = '';
      flagsLeft++;
    }
    document.getElementById('flags-left').innerText = `🚩=${flagsLeft}`;
    if (flagsLeft == 0) {
      checkFlagsOnMines();
      return;
    }
    return;
  }

  if (cell.innerText == '🚩') {
    return;
  }

  if (firstClick == true) {
    generateMines(cell.id);
    stopWatchHandler('start');
    firstClick = false;
  }

  if (minesLocation.includes(cell.id) && !cell.innerText) {
    cell.style.backgroundColor = 'red';
    revealMines();
    stopGame('lose');
    return;
  }
  console.log('inside cellClicked(): ');
  console.log(board);

  let coords = cell.id.split('-');
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  checkMine(r, c);
}

const checkFlagsOnMines = () => {
  let rightFlags = 0;
  minesLocation.forEach((coordinate) => {
    const mineCell = document.getElementById(coordinate);
    if (mineCell.innerText == '🚩') {
      rightFlags++;
    }
  });
  if (rightFlags == minesLocation.length) {
    stopGame('win');
  } else {
    stopGame('lose');
  }
};

const checkMine = (r, c) => {
  const board = getBoard2dArray();

  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }

  if (board[r][c].classList.contains('cell-clicked')) {
    return;
  }

  board[r][c].classList.replace('board-cell', 'cell-clicked');

  let minesFound = 0;

  //top 3 cells
  minesFound += checkCell(r - 1, c - 1);
  minesFound += checkCell(r - 1, c);
  minesFound += checkCell(r - 1, c + 1);

  //left and right
  minesFound += checkCell(r, c - 1);
  minesFound += checkCell(r, c + 1);

  //bottom 3 cells
  minesFound += checkCell(r + 1, c - 1);
  minesFound += checkCell(r + 1, c);
  minesFound += checkCell(r + 1, c + 1);

  if (minesFound > 0) {
    board[r][c].innerText = minesFound;
    board[r][c].classList.add(`x${minesFound}`);
  } else {
    //top 3 cells
    checkMine(r - 1, c - 1);
    checkMine(r - 1, c);
    checkMine(r - 1, c + 1);

    //left and right
    checkMine(r, c - 1);
    checkMine(r, c + 1);

    //bottom 3 cells
    checkMine(r + 1, c - 1);
    checkMine(r + 1, c);
    checkMine(r + 1, c + 1);
  }
};

const checkCell = (r, c) => {
  if (r < 0 || r > rows || c < 0 || c > columns) {
    return 0;
  }

  if (minesLocation.includes(r.toString() + '-' + c.toString())) {
    return 1;
  }
  return 0;
};

const generateMines = (clickedCellId) => {
  const coordinates = [];

  function findMinesAroundClick(MineCoordinates) {
    const r = parseInt(clickedCellId.split('-').at(0));
    const c = parseInt(clickedCellId.split('-').at(1));

    const cellsAroundClick = [];

    for (let row = r - 1; row <= r + 1; row++) {
      for (let col = c - 1; col <= c + 1; col++) {
        if (row !== r || col !== c) {
          cellsAroundClick.push(`${row}-${col}`);
        }
      }
    }

    if (cellsAroundClick.includes(MineCoordinates)) {
      return false;
    } else {
      return true;
    }
  }

  while (minesCount > 0) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * columns);
    const condition =
      !coordinates.includes(`${r}-${c}`) &&
      !clickedCellId.includes(`${r}-${c}`) &&
      findMinesAroundClick(`${r}-${c}`);
    if (!condition) continue;
    minesLocation.push(`${r}-${c}`);
    minesCount--;
    //paintTilesWhereMinesAre();
  }
};

const revealMines = () => {
  minesLocation.forEach((coordinate) => {
    const cellWithBomb = document.getElementById(coordinate);
    cellWithBomb.innerText = '💣';
    cellWithBomb.classList.remove('board-cell');
    cellWithBomb.classList.add('cell-bomb');
  });
};

const paintTilesWhereMinesAre = () => {
  minesLocation.forEach((coordinate) => {
    document.getElementById(coordinate).style.backgroundColor = '#cf8989';
  });
};

const stopGame = (state) => {
  const board = getBoard2dArray();

  stopWatchHandler('stop');

  document
    .getElementById('board')
    .insertAdjacentHTML('afterend', `<p id="stop-game-text"></p>`);
  const stopGameText = document.getElementById('stop-game-text');

  if (state === 'lose') {
    revealMines();
    stopGameText.innerText = 'You Lose...';
    stopGameText.style.color = '#fb4949';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        board[r][c].removeEventListener('click', cellClicked);
      }
    }
  } else if (state === 'win') {
    stopGameText.innerText = 'You Win!';
    stopGameText.style.color = '#35f43d';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        board[r][c].removeEventListener('click', cellClicked);
      }
    }
  }
};
