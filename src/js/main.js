import { startgame } from './game';

if (
  localStorage.getItem('width') == null &&
  localStorage.getItem('height') == null &&
  localStorage.getItem('mines') == null
) {
  localStorage.setItem('width', 10)
  localStorage.setItem('height', 10)
  localStorage.setItem('mines', 10)
}

const startGameButton = document.getElementById('start-game-btn');
startGameButton.addEventListener('click', startgame);

const settingsButton = document.getElementById('settings-btn');
settingsButton.addEventListener('click', () => {
  window.location.href = 'settings.html';
});
