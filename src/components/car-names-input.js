import {
  EMPTY_NAME_MESSAGE,
  EMPTY_STRING_MESSAGE,
  EXCEEDING_NAME_LENGTH_MESSAGE,
} from '../library/constants/alert-message-names.js';
import Component from '../library/core/component.js';

class CarNamesInput extends Component {
  #$carNamesInput;

  constructor($target, props) {
    super($target, props);
    this.initializeDOMElements();
  }

  initializeDOMElements() {
    this.#$carNamesInput = this._$target.querySelector('#car-names-input');
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.id === 'car-names-submit') {
        this.setCars(event);
      }
    });
    this._$target.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        this.setCars(event);
      }
    });
  }

  setCars() {
    let input;
    let carNames;
    input = this.#$carNamesInput.value;
    if (!this.isValidInput(input)) {
      this.handleError(input);
      return;
    }
    carNames = this.getCarNames(input);
    this._props.createCars(carNames);
  }

  handleError(input) {
    this.alertByCase(input);
    this.#$carNamesInput.value = '';
    this.#$carNamesInput.focus();
  }

  getCarNames(input) {
    return input.split(',').map(carName => carName.trim());
  }

  isValidInput(input) {
    const carNames = input.split(',').map(carName => carName.trim());
    if (input === '') {
      return false;
    }
    if (this.hasNameWithMoreThan5Letters(carNames)) {
      return false;
    }
    if (this.hasEmptyName(carNames)) {
      return false;
    }

    return true;
  }

  hasNameWithMoreThan5Letters(carNames) {
    for (const carName of carNames) {
      if (carName.length > 5) {
        return true;
      }
    }

    return false;
  }

  hasEmptyName(carNames) {
    for (const carName of carNames) {
      if (carName.length === 0) {
        return true;
      }
    }

    return false;
  }

  alertByCase(input) {
    const carNames = input.split(',').map(carName => carName.trim());
    let errorMessage = [];
    if (input === '') {
      errorMessage.push(EMPTY_STRING_MESSAGE);
    } else {
      if (this.hasNameWithMoreThan5Letters(carNames)) {
        errorMessage.push(EXCEEDING_NAME_LENGTH_MESSAGE);
      }
      if (this.hasEmptyName(carNames)) {
        errorMessage.push(EMPTY_NAME_MESSAGE);
      }
    }
    alert(`${errorMessage.join(', ')}을 입력하셨습니다. 다시 입력해주세요`);
  }
}

export default CarNamesInput;
