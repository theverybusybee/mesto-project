import { page } from "./constants.js";

export default class Popup {
  constructor(selector) {
    this._selector = document.querySelector(selector);
  }

  open() {
    this._selector.classList.add("popup_opened");
    document
      .querySelector(".page")
      .addEventListener(
        "keydown",
        this._hendleEscClose(document.querySelector(".page"))
      );
  }

  close() {
    this._selector.classList.remove("popup_opened");
    document
      .querySelector(".page")
      .removeEventListener(
        "keydown",
        this._hendleEscClose(document.querySelector(".page"))
      );
  }

  _hendleEscClose() {
    if (evt.key === "Escape") {
      const openedPopup = document
        .querySelector(".page")
        .querySelector(".popup_opened");
      openedPopup && this.close();
    }
  }

  setEventListeners() {
    this._selector.addEventListener("click", () => {
      // добавляем обработчик для открытия попапа
      this.open();
    });
    this._selector.addEventListener("mousedown", () => {
      // для закрытия
      if (this._selector.classList.contains("popup_opened")) {
        this.close();
      }
      if (this._selector.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}

/*

*/

/* -------------------------------- открытие модального окна -------------------------------*/

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  page.addEventListener("keydown", closePopupByPressingEsc);
}

/* ------------------------------- закрытие модального окна -------------------------------*/

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  page.removeEventListener("keydown", closePopupByPressingEsc);
}

function closePopupByPressingEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = page.querySelector(".popup_opened");
    openedPopup && closePopup(openedPopup);
  }
}
/*
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    };
  }); 
});
*/
export { openPopup, closePopup };
