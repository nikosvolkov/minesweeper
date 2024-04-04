import { startgame } from "./game";

const startGameButton = document.getElementById('start-game-btn')

startGameButton.addEventListener('click', startgame)

const board = document.getElementById('board')
console.log(board);