import { boardParameters } from './consts';

let currentWidthValue = boardParameters.rows;
let currentHeightValue = boardParameters.columns;
let currentMinesAmount = boardParameters.mines;
setValuesToInputsFromLS();
createInputPlaceholders();
setMinesInputRangeValue();

const homeButton = document.getElementById('home-button');
homeButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetSettingsToDefault);
const buttonCountainer = document.querySelector('.change-board-size');
buttonCountainer.addEventListener('click', inputHandler);

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('change', changeInputByKeyboard);
});

function changeInputByKeyboard() {
  const input = this;
  const paramName = input
    .closest('.settings-row-container')
    .querySelector('label').id;
  const maxValue = parseInt(input.getAttribute('max'));
  const minValue = parseInt(input.getAttribute('min'));
  const isInt = Number.isInteger(Number(input.value));

  if (!isInt) {
    input.classList.toggle('input-invalid');
    homeButton.disabled = true;
    return;
  }

  if (isInt && homeButton.disabled == true) {
    input.classList.toggle('input-invalid');
    homeButton.disabled = false;
  }

  if (input.value > maxValue) {
    input.value = maxValue;
    localStorage.setItem(paramName, input.value);
    return;
  } else if (input.value < minValue) {
    input.value = minValue;
    localStorage.setItem(paramName, input.value);
    return;
  }
  localStorage.setItem(paramName, input.value);
}

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

// long press handler
if ('ontouchstart' in document.body) {
  buttonCountainer.addEventListener('touchstart', (event) => {
    longPress(event);
    inputHandler(event);
  });
  buttonCountainer.addEventListener('touchend', (event) => {
    resetTimer(event), removeButtonAnimationOnMobile(event);
  });
} else {
  buttonCountainer.addEventListener('mousedown', longPress);
  buttonCountainer.addEventListener('mouseout', resetTimer);
  buttonCountainer.addEventListener('mouseup', resetTimer);
}

// click handler
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

function resetSettingsToDefault() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    if (input.classList.contains('input-invalid')) {
      input.classList.remove('input-invalid');
    }
    input.value = 10;
  });
  currentHeightValue = currentWidthValue = currentMinesAmount = 10;
  saveParamsToLocalStorage();
}

function setValuesToInputsFromLS() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach((input) => {
    const paramName = input
      .closest('.settings-row-container')
      .querySelector('label').id;
    const relatedLSValue = localStorage.getItem(paramName);
    if (relatedLSValue) {
      input.value = relatedLSValue;
    }
  });
}

let timer = null;
let interval = null;
function longPress(event) {
  if (event.target.tagName != 'BUTTON') return;
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

function resetTimer(event) {
  if (event.target.tagName != 'BUTTON') return;
  clearTimeout(timer);
  clearInterval(interval);
}

function addButtonAnimationOnMobile(event) {
  const button = event.target.closest('button');
  button.style.scale = 0.9;
  button.style.backgroundColor = '#ffd451';
}

function removeButtonAnimationOnMobile(event) {
  if (event.target.tagName != 'BUTTON') return;
  const button = event.target.closest('button');
  button.style.scale = 1;
  button.style.backgroundColor = '#ffca61';
}
