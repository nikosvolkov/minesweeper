import { restartGame } from "./game";

export const createBottomButtons = () => {
  const bottomButtons = document.createElement('div');
  bottomButtons.classList.add('bottom-buttons-container');
  
  const flagButton = document.createElement('button');
  flagButton.classList.add('flag-btn');
  flagButton.id = 'flag-btn';
  flagButton.innerText = '🚩';

  const homeButton = document.createElement('button');
  homeButton.classList.add('home-btn', 'bottom-btns')
  homeButton.id = 'home-button'
  homeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fc6e51" > <use href="images/sprites.svg#settings-home-btn"></use> </svg>'

  const restartButton = document.createElement('button')
  restartButton.classList.add('restart-btn', 'bottom-btns')
  restartButton.id = 'restart-button'
  restartButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1920" fill="#000"><use href="images/sprites.svg#settings-reset-btn"></use></svg>'

  bottomButtons.append(flagButton);
  bottomButtons.append(homeButton)
  bottomButtons.append(restartButton)
  document.getElementById('app').append(bottomButtons);

  flagButton.addEventListener('click', () => {
    flagButton.classList.toggle('flag-btn-active');
  });

  homeButton.addEventListener('click', ()=>{
    window.location.href = 'index.html'
  })

  restartButton.addEventListener('click', restartGame)
};

