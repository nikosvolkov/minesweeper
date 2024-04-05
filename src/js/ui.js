export const createFlagButton = () => {
  const flagButton = document.createElement('button');
  flagButton.classList.add('flag-btn');
  flagButton.id = 'flag-btn';
  flagButton.innerText = '🚩';

  document.getElementById('app').append(flagButton);

  flagButton.addEventListener('click', () => {
    flagButton.classList.toggle('flag-btn-active')
  });
};