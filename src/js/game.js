
const rows = 10;
const columns = 10;

let flagEnabled = false;

const minesCount = 15;
const minesLocation = []

const flagsLeft = minesCount // goal is to set all flags to the tiles with mines

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
    }else{
      cell.innerText = '';
    }
  }
}

const generateMines = () => {
  const coordinates = [];

  const generateCoordinate = () =>{
    const c = Math.floor(Math.random() * 10)
    const r = Math.floor(Math.random() * 10) 
    return `${r}-${c}`
  }

  for (let i = 1; i <= minesCount; i++){
    let newCoordinate = generateCoordinate();

    while(coordinates.includes(newCoordinate)){
      newCoordinate = generateCoordinate()
    }

    coordinates.push(newCoordinate)
  }

  minesLocation.push(...coordinates)
}

const paintTilesWhereMinesAre = () => {
  minesLocation.forEach((coordinate) => {
    document.getElementById(coordinate).style.backgroundColor = '#cf8989'
  })
}

export const startgame = () =>{
  document.getElementById('start-game-btn').remove()

  createBoard();
  createFlagButton();
  generateMines();
  paintTilesWhereMinesAre();
}



