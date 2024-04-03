let rows = 10;
let columns = 10;

const board = [];

let flagEnabled = false;

let minesCount = 10;
const minesLocation = [];

let gameOver = false;

const flagsLeft = minesCount; // goal is to set all flags to the tiles with mines

const gameDiv = document.getElementById('app');

const createBoard = () => {
  const boardDiv = document.createElement('div');
  boardDiv.id = 'board';
  boardDiv.classList.add('board');
  gameDiv.append(boardDiv);

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      const boardCell = document.createElement('div');
      boardCell.id = `${r}-${c}`;
      boardCell.classList.add('board-cell');
      boardCell.addEventListener('click', cellClicked);
      boardDiv.append(boardCell);
      row.push(boardCell);
    }
    board.push(row);
  }
  console.log(board);
};

const createFlagButton = () => {
  const flagButton = document.createElement('button');
  flagButton.classList.add('flag-btn');
  flagButton.id = 'flag-btn';
  flagButton.innerText = '🚩';

  gameDiv.append(flagButton);

  flagButton.addEventListener('click', () => {
    if (!flagEnabled) {
      flagButton.classList.add('flag-btn-active');
      flagEnabled = true;
    } else {
      flagButton.classList.remove('flag-btn-active');
      flagEnabled = false;
    }
  });
};

function cellClicked() {
  let cell = this;

  if (flagEnabled) {
    if (!cell.innerText) {
      cell.innerText = '🚩';
    } else {
      cell.innerText = '';
    }
    return;
  }
  cell.classList.remove('board-cell');

  if (minesLocation.includes(cell.id) && !cell.innerText) {
    cell.style.backgroundColor = 'red';
    revealMines();
    gameOver = true
    alert('GAME OVER');
    return;
  }

  let coords = cell.id.split('-');
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  checkMine(r, c);
}

const checkMine = (r, c) => {

  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }

  if (board[r][c].classList.contains('cell-clicked')) {
    return;
  }

  board[r][c].classList.replace('board-cell','cell-clicked')

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
    board[r][c].style.borderColor = 'green'
    return 1;
  }
  return 0;
};

const generateMines = () => {
  const coordinates = [];

  const generateCoordinate = () => {
    const c = Math.floor(Math.random() * 10); // from 0 to 9
    const r = Math.floor(Math.random() * 10); // from 0 to 9
    return `${r}-${c}`;
  };

  for (let i = 1; i <= minesCount; i++) {
    let newCoordinate = generateCoordinate();
    while (coordinates.includes(newCoordinate)) {
      newCoordinate = generateCoordinate();
    }
    coordinates.push(newCoordinate);
  }

  minesLocation.push(...coordinates);
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

export const startgame = () => {
  document.getElementById('start-game-btn').remove();

  createBoard();
  createFlagButton();
  generateMines();
  paintTilesWhereMinesAre();
};
