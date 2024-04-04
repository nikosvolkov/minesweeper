export const createFlagButton = () => {
  const flagButton = document.createElement('button');
  flagButton.classList.add('flag-btn');
  flagButton.id = 'flag-btn';
  flagButton.innerText = '🚩';

  document.getElementById('app').append(flagButton);

  flagButton.addEventListener('click', () => {
    if (!flagEnabled) {
      flagButton.classList.add('flag-btn-active');
      flagEnabled = true;
    } else {
      flagButton.classList.remove('flag-btn-active');
      flagEnabled = false;
    }
  });
};