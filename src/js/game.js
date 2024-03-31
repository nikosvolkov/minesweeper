
const rows = 10;
const columns = 10;

let flagEnabled = false;

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
      boardCell.addEventListener('click', cellClicked)
      boardDiv.append(boardCell)
    }
  }
}

const createFlagButton = () =>{
  const flagButton = document.createElement('button')
  flagButton.classList.add('flag-btn')
  flagButton.id = 'flag-btn'
  flagButton.innerText = '🚩'

  gameDiv.append(flagButton)

  flagButton.addEventListener('click', ()=>{
    if(!flagEnabled){
      flagButton.classList.add('flag-btn-active')
      flagEnabled = true;
    }else{
      flagButton.classList.remove('flag-btn-active')
      flagEnabled = false;
    }
    
  })
}

function cellClicked() {
  let cell = this;

  if (flagEnabled){
    if(!cell.innerText){
      cell.innerText = '🚩'
    }
  }
}

export const startgame = () =>{
  document.getElementById('start-game-btn').remove()

  createBoard();
  createFlagButton();
}



