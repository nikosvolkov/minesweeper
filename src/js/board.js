import {rows,columns} from "./consts"

export const createBoard = () => {
  const board = []

  const boardDiv = document.createElement('div');
  boardDiv.id = 'board';
  boardDiv.classList.add('board');

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      const boardCell = document.createElement('div');
      boardCell.id = `${r}-${c}`;
      boardCell.classList.add('board-cell');
      boardDiv.append(boardCell);
      row.push(boardCell);
    }
    board.push(row);
    boardDiv.append(board)
  }
  return board;
};

//export const board = createBoard();