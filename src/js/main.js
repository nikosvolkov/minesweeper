import { startgame } from "./game";

const startGameButton = document.getElementById('start-game-btn')
startGameButton.addEventListener('click', startgame)

const settingsButton = document.getElementById('settings-btn')
settingsButton.addEventListener('click', () => {
  window.location.href = 'settings.html'
})