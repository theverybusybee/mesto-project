export default class FormValidator {
  constructor(config, formSelector) {
    this._config = config;
    this._form = document.querySelector(formSelector);
    this._formInputs = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._form.elements.submitButton;

    // показываем сообщение об ошибке
    this._showError = (inputElement, errorMessage) => {
      const errorElement = this._form.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.add(this._config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._config.errorClass);
    };

    // скрываем сообщение об ошибке
    this._hideError = (inputElement) => {
      const errorElement = this._form.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.remove(this._config.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._config.errorClass);
    };

    // проверяем инпут на валидность и в соответсвии с этим показываем/скрываем сообщения об ошибке
    this._checkInputValidaty = (inputElement) => {
      let errorWarning = "";
      if (!inputElement.validity.valid) {
        this._showError(
          inputElement,
          this._setCustomErrorMessage(inputElement, errorWarning)
        );
      } else {
        this._hideError(inputElement);
      }
    };

    // изменяем состояние кнопки в зависимости от валидности инпутов
    this._toggleButtonState = () => {
      if (this._hasInvalidInput()) {
        this._submitButton.disabled = true;
      } else {
        this._submitButton.disabled = false;
      }
    };

    // указываем кастомные сообщения об ошибке в соответствии с макетом
    this._setCustomErrorMessage = (inputElement, errorMessage) => {
      if (inputElement.type.toString() === "url") {
        switch (inputElement.validity.typeMismatch) {
          case true:
            errorMessage = "Введите адрес сайта.";
            break;
          case false:
            errorMessage = "";
            break;
        }
      }
      if (inputElement.validity.valueMissing) {
        errorMessage = "Вы пропустили это поле.";
      } else {
        errorMessage = inputElement.validationMessage;
      }
      return errorMessage;
    };
  }

  // проверяем все поля формы на валидность
  _hasInvalidInput = () => {
    return this._formInputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // устанавливаем обработчики событий на все элементы форм
  setEventListeners() {
    this._toggleButtonState();
    this._formInputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidaty(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // устанавливаем слушатель событий для всех форм
  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._formInputs.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }
}
