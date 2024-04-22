let currentWidthValue = null;
let currentHeightValue = null;
let currentMinesAmount = null;
createInputPlaceholders();

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

const buttonActions = {
  plus(input, paramName) {
    let currentValue = parseInt(input.value);
    const maxValue = parseInt(input.getAttribute('max'));
    const minValue = parseInt(input.getAttribute('min'));

    if (currentValue < maxValue) {
      input.value++;
      currentValue = parseInt(input.value);
    } else if (currentValue == maxValue) {
      input.value = minValue;
      currentValue = parseInt(input.value);
    }
    if (currentValue > maxValue) {
      input.value = maxValue;
    }

    if (paramName == 'width') {
      currentWidthValue = currentValue;
      saveParamsToLocalStorage();
    } else if (paramName == 'height') {
      currentHeightValue = currentValue;
      saveParamsToLocalStorage();
    } else if (paramName == 'mines') {
      currentMinesAmount = currentValue;
      saveParamsToLocalStorage();
    }
  },
  minus(input, paramName) {
    let currentValue = parseInt(input.value);
    const minValue = parseInt(input.getAttribute('min'));
    const maxValue = parseInt(input.getAttribute('max'));

    if (currentValue > minValue) {
      input.value--;
      currentValue = parseInt(input.value);
    } else if (currentValue == minValue) {
      input.value = maxValue;
      currentValue = parseInt(input.value);
    }
    if (currentValue > maxValue) {
      input.value = maxValue;
    }

    if (paramName == 'width') {
      currentWidthValue = currentValue;
      saveParamsToLocalStorage();
    } else if (paramName == 'height') {
      currentHeightValue = currentValue;
      saveParamsToLocalStorage();
    } else if (paramName == 'mines') {
      currentMinesAmount = currentValue;
      saveParamsToLocalStorage();
    }
  },
};

const buttonCountainer = document.querySelector('.change-board-size');

// long press handler
if ('ontouchstart' in document.body) {
  buttonCountainer.addEventListener('touchstart', (event) => {
    longPress(event);
    inputHandler(event);
  });
  buttonCountainer.addEventListener('touchend', (event) => {
    resetTimer(), removeButtonAnimationOnMobile(event);
  });
} else {
  buttonCountainer.addEventListener('mousedown', longPress);
  buttonCountainer.addEventListener('mouseout', resetTimer);
  buttonCountainer.addEventListener('mouseup', resetTimer);
}

// click handler
buttonCountainer.addEventListener('click', inputHandler);
function inputHandler(event) {
  const buttonElement = event.target.closest('button');
  if (buttonElement == null) return;
  if ('ontouchstart' in document.body) {
    addButtonAnimationOnMobile(event);
  }
  const operation = buttonElement.dataset.operation;
  const relatedInput = event.target.parentNode.querySelector('input');
  const minValue = parseInt(relatedInput.getAttribute('min'));
  const paramName = relatedInput
    .closest('.settings-row-container')
    .querySelector('label').id;
  const isInputNaN = isNaN(parseInt(relatedInput.value));

  //check if unput is empty
  if (paramName == 'width' && isInputNaN) {
    currentWidthValue = minValue;
    relatedInput.value = currentWidthValue;
    setMinesInputRangeValue();
    saveParamsToLocalStorage();
    return;
  } else if (paramName == 'height' && isInputNaN) {
    currentHeightValue = minValue;
    relatedInput.value = currentHeightValue;
    setMinesInputRangeValue();
    saveParamsToLocalStorage();
    return;
  } else if (paramName == 'mines' && isInputNaN) {
    currentMinesAmount = minValue;
    relatedInput.value = currentMinesAmount;
    saveParamsToLocalStorage();
    return;
  }

  buttonActions[operation](relatedInput, paramName);
  setMinesInputRangeValue();
}

function setMinesInputRangeValue() {
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

function saveParamsToLocalStorage() {
  if (currentWidthValue) {
    localStorage.setItem('width', currentWidthValue);
  }
  if (currentHeightValue) {
    localStorage.setItem('height', currentHeightValue);
  }
  if (currentMinesAmount) {
    localStorage.setItem('mines', currentMinesAmount);
  }
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

let timer = null;
let interval = null;
function longPress(event) {
  // const buttonElement = event.target.closest('button');
  // if (buttonElement == null) return;

  if ('ontouchstart' in document.body && event.cancelable == true) {
    event.preventDefault();
  }
  if ('ontouchstart' in document.body) {
    addButtonAnimationOnMobile(event);
  }
  timer = setTimeout(() => {
    interval = setInterval(() => {
      inputHandler(event);
    }, 70);
  }, 500);
}

function resetTimer() {
  clearTimeout(timer);
  clearInterval(interval);
}

function addButtonAnimationOnMobile(event) {
  const button = event.target.closest('button');
  button.style.scale = 0.9;
  button.style.backgroundColor = '#ffd451';
}

function removeButtonAnimationOnMobile(event) {
  // const event = this;
  const button = event.target.closest('button');
  button.style.scale = 1;
  button.style.backgroundColor = '#ffca61';
}
