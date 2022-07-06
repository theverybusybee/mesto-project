import { photocardTemplate, cardsContainer, popupOpenPhotocard, popupPhotocardImage, popupPhotocardCaption, myId } from './constants.js'
import { manageCardDelete, toggleLike } from './index.js'
import { openPopup } from "./Popup.js";

export default class Card {
  constructor(item, selector) {
    this._selector = selector;
    this._name = item.name;
    this._id = item._id;
    this._ownerId = item.owner._id;
    this._src = item.link;
    this._alt = item.name;
  }

  getElement() { 
    const photocardElement = document
    .querySelector(this._selector) // использовали this._selector
      .content
      .querySelector('.photo-cards__list-item')
      .cloneNode(true);

    return photocardElement;
  }

  generate() { // объявляем публичный метод generate 
    this._element = this.getElement(); // получаем карточку от класса Card

    this._element.querySelector('.photo-cards__list-item-image').src= this._src;
    this._element.querySelector('.photo-cards__list-item-image').alt= this._name;
    this._element.querySelector('.photo-cards__list-item-caption').textContent =  this._name;

    return this._element; // возвращаем готовую карточку
  }

  _handleOpenPopup() { // определяем приватный метод _handleOpenPopup, который открывает попап с картинкой
    popupPhotocardImage.src = this._image;
    popupPhotocardCaption.textContent = this._name;
    popupOpenPhotocard.classList.add('popup_opened');
  }

  _handleClosePopup() { // определяем приватный метод _handleClosePopup, который закрывает попап с картинкой
    popupPhotocardImage.src = '';
    popupPhotocardCaption.textContent = '';
    popupOpenPhotocard.classList.remove('popup_is-opened');
  }

  _setEventListeners() { // определяем приватный метод _setEventListeners, который отвечает за открытие/закрытие попапа
    this._element.querySelector('.photo-cards__list-item-image').addEventListener('click', () => { // при клике на карточку открываем попап
      this._handleOpenPopup();
    });

    this._element.querySelector('.popup__close-button').addEventListener('click', () => { // при клике на крестик закрываем попап
      this._handleClosePopup();
    });
    
  }

  /*likeCard (likeButton, itemId, likeCounter) {
    likeButton.addEventListener('click', () => {
      if(likeButton.classList.contains('photo-cards__like-button_active')) {
        removeLike(itemId)
        .then((res) => {
          likeButton.classList.remove('photo-cards__like-button_active');
          displayLikesAmount(likeCounter, res);
        })
        .catch((err) => {
          console.log(err);
        })} else {
          addLike(itemId)
          .then((res) => {
            likeButton.classList.add('photo-cards__like-button_active');
            displayLikesAmount(likeCounter, res);
          })
          .catch((err) => {
            console.log(err);
          });
        };
      });
    }

    deleteCard(button, itemId, card) {
      button.addEventListener('click', () => {
        deletePhotocard(itemId)
          .then(() => {
            card.remove();
          })
          .catch((err) => {
            console.log(err);
          });
        });
    }*/
}






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