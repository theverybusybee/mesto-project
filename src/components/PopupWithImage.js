import popup from "./Popup.js";

export default class PopupWithImage extends popup {
  constructor(selector) {
    super(selector);
    this._picture = document.querySelector(".popup__photocardImage");
    this._caption = document.querySelector(".popup__photocardCaption");
  }

  open(item) {
    super.open();
    this._picture.src = item.link; // присваиваем src значение imageValue
    this._picture.alt = item.name; // присваиваем src значение imageValue
    this._caption.textContent = item.name; // заменяем содержимое подписи на captionValue
  }
}
