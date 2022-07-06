import { page } from "./constants.js";

export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._page = document.querySelector(".page__container");
    this._closeButton = this._selector.querySelector(".popup__close-button");
    this._hendleEscClose = (evt) => {
      if (evt.key === "Escape") {
        const openedPopup = this._page.querySelector(".popup_opened");
        openedPopup && this.close();
      }
    };
  }

  open() {
    this._selector.classList.add("popup_opened");
    this._page.addEventListener("keydown", this._hendleEscClose);
  }

  close() {
    this._selector.classList.remove("popup_opened");
    this._page.removeEventListener("keydown", this._hendleEscClose);
  }

  _hendleBgClose() {
    this._selector.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      console.log(evt.target);
    });
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._hendleBgClose();
  }
}
/* -------------------------------- открытие модального окна -------------------------------*/
/*
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  page.addEventListener("keydown", closePopupByPressingEsc);
}
*/
/* ------------------------------- закрытие модального окна -------------------------------*/
/*
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
*/
