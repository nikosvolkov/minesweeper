import { startgame } from "./game";
import { clickSettingsButton } from "./settings";


const startGameButton = document.getElementById('start-game-btn')
const settingsButton = document.getElementById('settings-btn')
startGameButton.addEventListener('click', startgame)
settingsButton.addEventListener('click', clickSettingsButton)
