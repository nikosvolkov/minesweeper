const homeButton = document.getElementById('home-button')
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html'
})

const buttonActions = {
  plus(input){input.value++},
  minus(input){input.value--}
}

const buttonCountainer = document.querySelector('.change-board-size')
buttonCountainer.addEventListener('click', (event) =>{
  const buttonElement = event.target.closest('button')
  if (buttonElement == null) return;
  const operation = buttonElement.dataset.operation;
  const relatedInput = event.target.parentNode.querySelector('input')
  buttonActions[operation](relatedInput)
})

