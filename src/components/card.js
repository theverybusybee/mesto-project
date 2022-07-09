import {
  photocardTemplate,
  cardsContainer,
  popupOpenPhotocard,
  popupPhotocardImage,
  popupPhotocardCaption,
  myId,
} from "./constants.js";
import { manageCardDelete, toggleLike } from "./index.js";
import { openPopup } from "./Popup.js";

export default class Card {
  constructor(item, selector, handleCardClick, toggleLike, userId, deleteCard) {
    this._selector = selector;
    this._item = item;
    this._name = item.name;
    this._id = item._id;
    this._ownerId = item.owner._id;
    this._src = item.link;
    this._alt = item.name;
    this._handleCardClick = handleCardClick;
    this._likes = item.likes;
    this._likesAmount = item.likes.length;
    this._toggleLike = toggleLike;
    this._deleteCard = deleteCard;
    this._userId = userId;
  }

  getCardId() {
    return this._id;
  }

  getOwnerId() {
    return this._ownerId;
  }

  getElement() {
    const photocardElement = document
      .querySelector(this._selector) // использовали this._selector
      .content.querySelector(".photo-cards__list-item")
      .cloneNode(true);
    return photocardElement;
  }

  generate() {
    // объявляем публичный метод generate
    this._element = this.getElement(); // получаем карточку от класса Card
    this._elImg = this._element.querySelector(".photo-cards__list-item-image");
    this._elCaption = this._element.querySelector(
      ".photo-cards__list-item-caption"
    );
    this._elLikeBtn = this._element.querySelector(".photo-cards__like-button");
    this._elCounter = this._element.querySelector(".photo-cards__like-counter");
    this._elDeleteBtn = this._element.querySelector(
      ".photo-cards__delete-button"
    );

    this._elImg.src = this._src;
    this._elImg.alt = this._name;
    this._elCaption.textContent = this._name;

    this._setEventListeners();

    this._likes.forEach((like) => {
      if (this._userId == like._id) {
        this._elLikeBtn.classList.add("photo-cards__like-button_active");
      }
    });

    if (this._ownerId == this._userId) {
      this._elDeleteBtn.classList.add("photo-cards__delete-button_type_active");
    }

    this._elCounter.textContent = this._likesAmount;

    return this._element; // возвращаем готовую карточку
  }

  addLike(likeAmount) {
    this._elLikeBtn.classList.add("photo-cards__like-button_active");
    this._elCounter.textContent = likeAmount.likes.length;
  }

  removeLike(likeAmount) {
    this._elLikeBtn.classList.remove("photo-cards__like-button_active");
    this._elCounter.textContent = likeAmount.likes.length;
  }

  _setEventListeners() {
    // определяем приватный метод _setEventListeners, который отвечает за открытие/закрытие попапа
    this._elImg.addEventListener("click", () => {
      // при клике на карточку открываем попап
      this._handleCardClick(this._src, this._alt);
    });

    this._elLikeBtn.addEventListener("click", (evt) => {
      this._toggleLike(evt, this);
      console.log(this);
    });

    this._elDeleteBtn.addEventListener('click', (evt) => {
      this._deleteCard(evt, this, this._element);
    })
  }
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

function createCard(item) {
  const photocardElement = photocardTemplate
    .querySelector(".photo-cards__list-item")
    .cloneNode(true); // клонируем содержимое template
  const photocardImage = photocardElement.querySelector(
    ".photo-cards__list-item-image"
  );
  const photocardCaption = photocardElement.querySelector(
    ".photo-cards__list-item-caption"
  );
  const likeButton = photocardElement.querySelector(
    ".photo-cards__like-button"
  );
  const likeCounter = photocardElement.querySelector(
    ".photo-cards__like-counter"
  );
  const deleteButton = photocardElement.querySelector(
    ".photo-cards__delete-button"
  );
  const itemId = item._id;
  const userId = item.owner._id;

  photocardImage.src = item.link; // присваиваем src значение imageValue
  photocardImage.alt = item.name; // присваиваем src значение imageValue
  photocardCaption.textContent = item.name; // заменяем содержимое подписи на captionValue

  // добавляем урну своим карточкам
  if (userId == myId.id) {
    deleteButton.classList.add("photo-cards__delete-button_type_active");
  }

  // удаляем карточку с сервера
  //manageCardDelete(deleteButton, itemId, photocardElement);

  // лайки
  //displayLikesAmount(likeCounter, item);

  //toggleLike(likeButton, itemId, likeCounter);

  // отображаем поставленные лайки при загрузке страницы
  /*
    item.likes.forEach((item) => {
      if(item._id == myId.id) {
        likeButton.classList.add('photo-cards__like-button_active');
      };
    });
    */

  photocardImage.addEventListener("click", () => {
    //openPopup(popupOpenPhotocard);
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
};

// выводим количество лайков
const displayLikesAmount = (likeCounter, card) => {
  likeCounter.textContent = card.likes.length;
};

export { createCard, addPhotocard, renderItems, displayLikesAmount };
