import { page } from './constants.js'

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
