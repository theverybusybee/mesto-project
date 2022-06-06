import { openPopup, closePopup } from "./modal.js";
import { popupAddPhoto } from './index.js';


// карточки
const photocardTemplate = document.querySelector('.photocardTemplate').content; // содержимое template
const cardsContainer = document.querySelector('.photo-cards__list'); // список всех карточек

// попап с карточкой
const popupOpenPhotocard = document.querySelector('.popup__photocardPicture');
const popupPhotocardImage = popupOpenPhotocard.querySelector('.popup__photocardImage');
const popupPhotocardCaption = popupOpenPhotocard.querySelector('.popup__photocardCaption');

// форма для добавления карточек
const addPhotoForm = document.forms.addPhoto;
const addPhotoInputImage = addPhotoForm.elements.photocardImage;
const addPhotoInputCaption = addPhotoForm.elements.photocardCaption;

function createCard(item) {
  const photocardElement = photocardTemplate.querySelector('.photo-cards__list-item').cloneNode(true); // клонируем содержимое template
  const photocardImage = photocardElement.querySelector('.photo-cards__list-item-image');
  const photocardCaption = photocardElement.querySelector('.photo-cards__list-item-caption');
  const likeButton = photocardElement.querySelector('.photo-cards__like-button');

  photocardImage.src = item['link']; // присваиваем src значение imageValue
  photocardImage.alt = item['name']; // присваиваем src значение imageValue
  photocardCaption.textContent = item['name']; // заменяем содержимое подписи на captionValue

  photocardElement.querySelector('#deleteButton').addEventListener('click', (evt) => {
    evt.target.closest('.photo-cards__list-item').remove();
  });

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-cards__like-button_active');
  });

  photocardImage.addEventListener('click', () => {
    openPopup(popupOpenPhotocard);
    popupPhotocardImage.src = item['link']; // присваиваем src значение imageValue
    popupPhotocardImage.alt = item['name']; // присваиваем src значение imageValue
    popupPhotocardCaption.textContent = item['name']; // заменяем содержимое подписи на captionValue
  });
  return photocardElement;
}

/* -------------------------------- добавление карточек -------------------------------- */

function addPhotocard(card) {
  const photocardElement = createCard(card);
  cardsContainer.prepend(photocardElement);
}

function handleCardFormSubmit(evt) {
  addPhotocard({ name: addPhotoInputCaption.value, link: addPhotoInputImage.value });
  evt.preventDefault();
  closePopup(popupAddPhoto);
  addPhotoForm.reset();
  addPhotoForm.elements.submitButton.disabled = true;
}

export { createCard, addPhotocard, handleCardFormSubmit };
