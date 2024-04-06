import { createBoard } from './board';
import { rows, columns } from './consts';
import { createFlagButton } from './ui';
import { getBoard2dArray, stopWatchHandler } from './utils';

let minesCount = 10;
const minesLocation = [];
let gameOver = false;
let firstClick = true;
let flagsLeft = minesCount;

export const startgame = () => {
  document.getElementById('start-game-btn').remove();

  

  const infoDiv = document.createElement('div');
  infoDiv.classList.add('time-flag-container');
  infoDiv.innerHTML = `<span id="flags-left">🚩=${flagsLeft}</span><span id="stopwatch">⏱:000</span>`;
  document.getElementById('app').prepend(infoDiv);

  const board = createBoard();
  board.forEach(() => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        board[r][c].addEventListener('click', cellClicked);
      }
    }
  });
  createFlagButton();
  console.log('inside startgame(): ');
  console.log(board);
};

function cellClicked() {
  let cell = this;
  if (gameOver || cell.classList.contains('cell-clicked')) {
    return;
  }

  if (firstClick == true) {
    generateMines(cell.id);
    stopWatchHandler('start');
    firstClick = false;
  }

  const flagButton = document.getElementById('flag-btn');

  if (flagButton.classList.contains('flag-btn-active')) {
    if (!cell.innerText) {
      cell.innerText = '🚩';
      flagsLeft--;
    } else {
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

  stopWatchHandler('stop')

  if (state === 'lose') {
    revealMines();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        board[r][c].removeEventListener('click', cellClicked);
      }
    }
  } else if (state === 'win') {
    alert('you won!');
  }
};
