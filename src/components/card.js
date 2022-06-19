import { photocardTemplate, cardsContainer, popupOpenPhotocard, popupPhotocardImage, popupPhotocardCaption, myId } from './constants.js'
import { manageCardDelete, toggleLike } from './index.js'
import { openPopup } from "./modal.js";

function createCard(item) {
  const photocardElement = photocardTemplate.querySelector('.photo-cards__list-item').cloneNode(true); // клонируем содержимое template
  const photocardImage = photocardElement.querySelector('.photo-cards__list-item-image');
  const photocardCaption = photocardElement.querySelector('.photo-cards__list-item-caption');
  const likeButton = photocardElement.querySelector('.photo-cards__like-button');
  const likeCounter = photocardElement.querySelector('.photo-cards__like-counter');
  const deleteButton = photocardElement.querySelector('.photo-cards__delete-button');
  const itemId = item._id;
  const userId = item.owner._id;

  photocardImage.src = item.link; // присваиваем src значение imageValue
  photocardImage.alt = item.name; // присваиваем src значение imageValue
  photocardCaption.textContent = item.name; // заменяем содержимое подписи на captionValue

  // добавляем урну своим карточкам
  if(userId == myId.id) {
    deleteButton.classList.add('photo-cards__delete-button_type_active');
  };

  // удаляем карточку с сервера
  manageCardDelete(deleteButton, itemId, photocardElement);

  // лайки
  displayLikesAmount(likeCounter, item);

  toggleLike(likeButton, itemId, likeCounter);
    
    // отображаем поставленные лайки при загрузке страницы
    item.likes.forEach((item) => {
      if(item._id == myId.id) {
        likeButton.classList.add('photo-cards__like-button_active');
      };
    });

    /*
    */

  photocardImage.addEventListener('click', () => {
    openPopup(popupOpenPhotocard);
    popupPhotocardImage.src = item.link; // присваиваем src значение imageValue
    popupPhotocardImage.alt = item.name; // присваиваем src значение imageValue
    popupPhotocardCaption.textContent = item.name; // заменяем содержимое подписи на captionValue
  });

  return photocardElement;
}

/* -------------------------------- добавление карточек -------------------------------- */

// добавляем карточку в начало списка
function addPhotocard(card) {
  cardsContainer.prepend(createCard(card));
}

const renderItems = (cards) => {
  cards.forEach((card) => {
    cardsContainer.append(createCard(card)); // располагаем карточки в начале списка
  });
}

   // выводим количество лайков 
const displayLikesAmount = ( likeCounter, card) => {
    likeCounter.textContent = card.likes.length;
  };

export { createCard, addPhotocard, renderItems, displayLikesAmount };