export const createFlagButton = () => {
  const bottomButtons = document.createElement('div');
  bottomButtons.classList.add('board-buttons-container');
  
  const flagButton = document.createElement('button');
  flagButton.classList.add('flag-btn');
  flagButton.id = 'flag-btn';
  flagButton.innerText = '🚩';

  bottomButtons.append(flagButton);
  document.getElementById('app').append(bottomButtons);

  flagButton.addEventListener('click', (e) => {
    e.preventDefault()
    flagButton.classList.toggle('flag-btn-active');
  });
};

export const createHomeButton = () => {
  const homeButton = document.createElement('button');
};
