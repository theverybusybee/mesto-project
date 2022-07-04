import Popup from './Popup.js'

class PopupWithForm extends Popup() {
  constructor(selector, submitCallback, formSelector) {
    super(selector);
    this._submitCallback = submitCallback;
    this._formSelector = document.forms.selector;
  }

  _getInputValues() {
    this._inputValues = {};
    this._formSelector.elements.forEach((element) => {
      this._inputValues[element.name] = element.value;
    })
    return this._inputValues
  }

   close() {
    super.close()
    this._formSelector.reset();
    this._formSelector.elements.submitButton.disabled = true;  
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener('submit', () => {
      this._submitCallback(this._getInputValues());
    })
  }
}