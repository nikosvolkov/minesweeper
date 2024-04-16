const homeButton = document.getElementById('home-button')
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html'
})

const changeInputValueButtons = document.querySelectorAll('.change-value-btns')

for (const button of changeInputValueButtons){
  button.addEventListener('click', clickInputValueButton)
}

function clickInputValueButton(){
  const buttonId = this.id;
  const relatedInputId = buttonId.split('-')[0] + '-input'

  console.log(buttonId);
}

