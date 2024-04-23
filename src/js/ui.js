export const createBottomButtons = () => {
  const bottomButtons = document.createElement('div');
  bottomButtons.classList.add('bottom-buttons-container');
  
  const flagButton = document.createElement('button');
  flagButton.classList.add('flag-btn');
  flagButton.id = 'flag-btn';
  flagButton.innerText = '🚩';

  const homeButton = document.createElement('button');
  homeButton.classList.add('home-btn')
  homeButton.id = 'home-button'
  homeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fc6e51" > <use href="images/sprites.svg#settings-home-btn"></use> </svg>'

  bottomButtons.append(flagButton);
  bottomButtons.append(homeButton)
  document.getElementById('app').append(bottomButtons);

  homeButton.addEventListener('click', ()=>{
    window.location.href = 'index.html'
  })

  flagButton.addEventListener('click', (e) => {
    flagButton.classList.toggle('flag-btn-active');
  });
};

