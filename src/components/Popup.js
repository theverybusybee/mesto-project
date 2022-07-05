import { page } from "./constants.js";

export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  open() {
    this._selector.classList.add("popup_opened");
    /* document
      .querySelector(".page")
      .addEventListener(
        "keydown",
        this._hendleEscClose(document.querySelector(".page"))
      ); */
  }

  close() {
    this._selector.classList.remove("popup_opened");
    /*  document
      .querySelector(".page")
      .removeEventListener(
        "keydown",
        this._hendleEscClose(document.querySelector(".page"))
      ); */
  }
  /*
  _hendleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document
        .querySelector(".page")
        .querySelector(".popup_opened");
      openedPopup && this.close();
    }
  }
*/
  setEventListeners() {
    this._selector.addEventListener("mousedown", () => {
      // для закрытия
      if (this._selector.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}

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

export { openPopup, closePopup };
