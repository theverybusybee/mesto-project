import { page } from './constants.js'


class popup {
  constructor(selector) {
    this._selector = selector
  }

  open() {
    this._selector.classList.add('popup_opened');
  }

  close() {
    this._selector.classList.remove('popup_opened');
  }

  _hendleEscClose(page) {
    if (evt.key === "Escape") {
      const openedPopup = page.querySelector(".popup_opened");
      openedPopup && close();
    }
  }
}

class popupWithImage extends popup {
  _selector = super.selector
  open() {
    this._selector.classList.add('popup_opened');
    this.src = item.link; // присваиваем src значение imageValue
    this.alt = item.name; // присваиваем src значение imageValue
    this.textContent = item.name; // заменяем содержимое подписи на captionValue
  }

}










/* -------------------------------- открытие модального окна -------------------------------*/

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  page.addEventListener('keydown', closePopupByPressingEsc);
}

/* ------------------------------- закрытие модального окна -------------------------------*/

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  page.removeEventListener('keydown', closePopupByPressingEsc);
}

function closePopupByPressingEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = page.querySelector(".popup_opened");
    openedPopup && closePopup(openedPopup);
  }
}

export { openPopup, closePopup }
