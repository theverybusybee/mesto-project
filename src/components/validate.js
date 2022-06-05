export { showError, hideError, setCustomErrorMessage, checkInputValidaty, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation }

/* -------------------------------- валидация форм -------------------------------- */

// показываем сообщение об ошибке
const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__form-item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-item-error_active');
}

// скрываем сообщение об ошибке
const hideError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__form-item_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__form-item-error_active');
}

// указываем кастомные сообщения об ошибке в соответствии с макетом
const setCustomErrorMessage = (inputElement, errorMessage) => {
  if(inputElement.type.toString() === 'url') {
      switch (inputElement.validity.typeMismatch) {
        case true: errorMessage = 'Введите адрес сайта.';
        break;
        case false: errorMessage = '';
        break;
      } 
    } 
    if (inputElement.validity.valueMissing) {
      errorMessage = 'Вы пропустили это поле.'
    } else { 
      errorMessage = inputElement.validationMessage;
    }
    return errorMessage;
}

// проверяем инпут на валидность и в соответсвии с этим показываем/скрываем сообщения об ошибке
const checkInputValidaty = (formElement, inputElement) => {
  let errorWarning = '';
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, setCustomErrorMessage(inputElement, errorWarning));
  } else {
    hideError(formElement, inputElement);
  }
}

// проверяем все поля формы на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// изменяем состояние кнопки в зависимости от валидности инпутов
const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
}

// устанавливаем обработчики событий на все элементы форм
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__form-item'));
  const submitButton = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidaty(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};

// устанавливаем слушатель событий для всех форм     
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();