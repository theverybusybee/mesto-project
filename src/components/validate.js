/* -------------------------------- валидация форм -------------------------------- */

// показываем сообщение об ошибке
const showError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

// скрываем сообщение об ошибке
const hideError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(selectors.errorClass);
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
const checkInputValidaty = (formElement, inputElement, selectors) => {
  let errorWarning = '';
  if(!inputElement.validity.valid) {
    showError(formElement, inputElement, setCustomErrorMessage(inputElement, errorWarning), selectors);
  } else {
    hideError(formElement, inputElement, selectors);
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
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const submitButton = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidaty(formElement, inputElement, selectors);
      toggleButtonState(inputList, submitButton);
    });
  });
};

// устанавливаем слушатель событий для всех форм     
const enableValidation = ({formSelector, ...rest}) => { // добавляем остаточный параметр к функции
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest); // используем оператор расширения при вызове в качестве аргумента
  });
};