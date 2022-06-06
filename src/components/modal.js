/* -------------------------------- открытие модального окна -------------------------------*/
const page = document.querySelector('.page');

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
  const openedPopup = page.querySelector('.popup_opened');
  if ((evt.key === 'Escape') && (page.contains(openedPopup))) {
      closePopup(openedPopup);
    }
}

export { openPopup, closePopup }
