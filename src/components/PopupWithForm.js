import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // кроме селектора попапа принимает в конструктор колбэк сабмита формы
  constructor({ selector, submitCallback }) {
    super(selector);
    this._submitCallback = submitCallback;
    this._form = this._selector.querySelector(".popup__form");
    this._formElements = this._form.elements;
    this._formSubmit = this._formElements.submitButton;
  }

  // приватный метод _getInputValues, который собирает данные всех полей формы
  _getInputValues() {
    this._inputValues = {};
    for(let i = 0; i < this._formElements.length - 1; i += 1) {
      this._inputValues[this._formElements[i].name] = this._formElements[i].value;
    }
    return this._inputValues;
  }

  // перезаписываем родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться
  close() {
    super.close();
    //this._form.reset();
  }

  // Перезаписываем родительский метод setEventListeners, тк он должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }

  // передаем данные инпутов формы в колбек
  _submitForm = (evt) => {
    this._submitCallback(this._getInputValues());
    this.close();
    //  this._formSubmit.disabled = true;
  };
}
