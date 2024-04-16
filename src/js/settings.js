
if (window.location.href == 'index.html'){
  const homeButton = document.getElementById('home-button')
  homeButton.addEventListener('click', () =>{
    console.log('home');
    window.location.href = 'index.html'
  })
}

export const clickSettingsButton = () =>{
  window.location.href = 'settings.html'
}