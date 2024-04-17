let currentWidthValue = null;
let currentHeightValue = null;

createInputPlaceholders();

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

const buttonActions = {
  plus(input, sizeName) {
    let currentValue = parseInt(input.value);
    const maxValue = parseInt(input.getAttribute('max'));

    if (currentValue < maxValue) {
      input.value++;
      currentValue = parseInt(input.value);
    }

    if (sizeName == 'width') {
      currentWidthValue = currentValue;
    } else if (sizeName == 'height') {
      currentHeightValue = currentValue;
    } else return;
  },
  minus(input, sizeName) {
    let currentValue = parseInt(input.value);
    const minValue = parseInt(input.getAttribute('min'));

    if (currentValue > minValue) {
      input.value--;
      currentValue = parseInt(input.value);
    }

    if (sizeName == 'width') {
      currentWidthValue = currentValue;
    } else if (sizeName == 'height') {
      currentHeightValue = currentValue;
    } else return;
  },
};

const buttonCountainer = document.querySelector('.change-board-size');
buttonCountainer.addEventListener('click', (event) => {

  const buttonElement = event.target.closest('button');
  if (buttonElement == null) return;
  const operation = buttonElement.dataset.operation;
  const relatedInput = event.target.parentNode.querySelector('input');
  const minValue = parseInt(relatedInput.getAttribute('min'));
  const sizeName = relatedInput.parentNode.previousElementSibling.id;
  const isInputNaN = isNaN(parseInt(relatedInput.value));
  if (sizeName == 'width' && isInputNaN) {
    currentWidthValue = minValue;
  } else if (sizeName == 'height' && isInputNaN) {
    currentHeightValue = minValue;
  }
  if (isInputNaN) {
    relatedInput.value = minValue;
    setMinesRangeValue();
    return;
  }

  buttonActions[operation](relatedInput, sizeName);
  setMinesRangeValue();
});


function setMinesRangeValue() {
  if (currentHeightValue == null || currentWidthValue == null) return;
  const minesInput = document.getElementById('mines-input');
  const minMines = 1;
  const maxMines = Math.round(
    currentHeightValue * currentWidthValue -
    (currentHeightValue * currentWidthValue * 40) / 100
  );

  minesInput.setAttribute('min', minMines);
  minesInput.setAttribute('max', maxMines);
  createInputPlaceholders();
  console.log('Max Mines: ' + maxMines);
}


function createInputPlaceholders() {
  const pageInputs = document.querySelectorAll('input');
  pageInputs.forEach((input) => {
    if (!input.hasAttribute('min')) return;
    const minValue = input.getAttribute('min');
    const maxValue = input.getAttribute('max');
    input.setAttribute('placeholder', `${minValue}-${maxValue}`);
  });
}