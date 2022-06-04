import { addPhotoForm, cardsContainer } from "../scripts/script.js";
console.log(addPhotoForm);

// карточки
const photocardTemplate = document.querySelector('.photocardTemplate').content; // содержимое template
// попапы
const popupOpenPhotocard = document.querySelector('.popup__photocardPicture');
const popupPhotocardImage = popupOpenPhotocard.querySelector('.popup__photocardImage');
const popupPhotocardCaption = popupOpenPhotocard.querySelector('.popup__photocardCaption');
// форма для добавления карточек
const addPhotoInputImage = addPhotoForm.elements.photocardImage;
const addPhotoInputCaption = addPhotoForm.elements.photocardCaption;

/*----------------------------------------- дефолтные карточки -----------------------------------*/

const initialCards = [

  {
    name: 'Chrysanthemum',
    link: 'https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'White Cherry',
    link: 'https://images.unsplash.com/photo-1615280825886-fa817c0a06cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Camomile',
    link: 'https://images.unsplash.com/photo-1567954130677-1adcd30d0e5c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    name: 'Camellia',
    link: 'https://images.unsplash.com/photo-1618988660091-7077afc52e99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Lotus',
    link: 'https://images.unsplash.com/photo-1599797195012-09c276a9c5f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Crocuses',
    link: 'https://images.unsplash.com/photo-1550595781-9b3686713647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
];

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
}

export { initialCards, createCard, handleCardFormSubmit };