
const rows = 10;
const columns = 10;

const gameDiv =  document.getElementById('app')

const createBoard = () =>{
  const boardDiv = document.createElement('div')
  boardDiv.id = 'board'
  boardDiv.classList.add('board')
  gameDiv.append(boardDiv)

  for (let r = 0; r < rows; r++){
    for(let c = 0; c < columns; c++){
      const boardCell = document.createElement('div')
      boardCell.id = `${r}-${c}`;
      boardDiv.append(boardCell)
    }
  }
}

export const startgame = () =>{
  document.getElementById('start-game-btn').remove()

  createBoard();
}