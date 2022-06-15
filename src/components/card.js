import { photocardTemplate, cardsContainer, popupOpenPhotocard, popupPhotocardImage, popupPhotocardCaption, addPhotoForm, addPhotoInputImage, addPhotoInputCaption, popupAddPhoto, myId } from './const.js'
import { renderFormLoading } from "./utils.js";
import { openPopup, closePopup } from "./modal.js";
import { addCard, deletePhotocard, addLike, removeLike } from './api.js'

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
  deleteButton.addEventListener('click', () => {
    deletePhotocard(itemId)
      .then(() => {
        photocardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      });
    });

    // выводим количество лайков 
    const displayLikesAmount = (card) => {
      likeCounter.textContent = card.likes.length;
    };
    
    displayLikesAmount(item);
    
    // отображаем поставленные лайки при загрузке страницы
    item.likes.forEach((item) => {
      if(item._id == myId.id) {
        likeButton.classList.add('photo-cards__like-button_active');
      };
    });
    
    // ставим/удаляем лайк в зависимости от того, проставлен ли он
    likeButton.addEventListener('click', () => {
      if(likeButton.classList.contains('photo-cards__like-button_active')) {
        removeLike(itemId)
        .then((res) => {
          likeButton.classList.remove('photo-cards__like-button_active');
          displayLikesAmount(res);
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        addLike(itemId)
        .then((res) => {
          likeButton.classList.add('photo-cards__like-button_active');
          displayLikesAmount(res);
        })
        .catch((err) => {
          console.log(err);
      });
    };
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

// добавляем карточку в начало списка
function addPhotocard(card) {
  cardsContainer.prepend(createCard(card));
}

function handleCardFormSubmit(e) {
  renderFormLoading(true, addPhotoForm);
  addCard(addPhotoInputCaption.value, addPhotoInputImage.value)
  .then((res) => {
    addPhotocard(res);
    addPhotoForm.reset();
    addPhotoForm.elements.submitButton.disabled = true;  
    closePopup(popupAddPhoto);
  })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderFormLoading(false, addPhotoForm);
    })
}

export { createCard, handleCardFormSubmit };