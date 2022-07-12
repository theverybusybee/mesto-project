export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
    this._page = document.querySelector(".page__container");
    this._closeButton = this._selector.querySelector(".popup__close-button");
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._selector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._selector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _hendleBgClose() {
    this._selector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._hendleBgClose();
  }
}
