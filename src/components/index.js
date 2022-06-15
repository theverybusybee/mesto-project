import '../pages/index.css';
import { avatarEditButton, profileEditButton, addPhotocardButton, popups, popupEditAvatar, popupEditProfile,  popupAddPhoto, editProfileForm, editProfileInputName, editProfileInputCaption, profileUsername, profileCaption, avatar, editAvatarForm, editAvatarInputUrl, addPhotoForm, myId, addPhotoInputImage, addPhotoInputCaption, validationConfig } from './constants.js'
import { renderFormLoading } from "./utils.js";
import { renderItems, addPhotocard, displayLikesAmount } from './card.js';
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from './validate.js';
import { getUserData, changeProfileData, editAvatar, getInitialCards, addCard, deletePhotocard, addLike, removeLike } from './api.js';

/* -------------------------------- открытие модального окна -------------------------------*/

avatarEditButton.addEventListener('click', function() {
  openPopup(popupEditAvatar);
})

addPhotocardButton.addEventListener('click', function () {
  openPopup(popupAddPhoto);
});

profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  editProfileInputName.value = profileUsername.textContent;
  editProfileInputCaption.value = profileCaption.textContent;
});

/* ----------------------------- закрытие модального окна ----------------------------*/

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    };
  }); 
});

/* ----------------------------- получаем данные пользователя и карточек ------------------------------ */
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    saveUserData(userData);
    renderItems(cards)
  })
  .catch(err => {
    console.log(err);
  });

  const saveUserData = (data) => {
    profileUsername.textContent = data.name;
    profileCaption.textContent = data.about;
    avatar.src = data.avatar;
    myId.id = data._id;
  } 

/* -------------------------------- редактирование профиля ---------------------------------- */

// редактирование аватара
editAvatarForm.addEventListener('submit', function(evt) {
  renderFormLoading(true, editAvatarForm);
  editAvatar(editAvatarInputUrl.value)
    .then((res) => {
      avatar.src = res.avatar;
      evt.target.reset();
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderFormLoading(false, editAvatarForm);
    })
})

// редактирование информации 'о себе'
// добавляем событие: достаем значения из полей и присваиваем их username и caption, отправляем данные на сервер, закрываем поп-ап
editProfileForm.addEventListener('submit', () => {
  renderFormLoading(true, editProfileForm);
  changeProfileData(editProfileInputName.value, editProfileInputCaption.value)
    .then((res) => {
      profileUsername.textContent = res.name
      profileCaption.textContent = res.about
      closePopup(popupEditProfile)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderFormLoading(false, editProfileForm);
    })
});

/* --------------------------------- добавление карточек --------------------------------- */

addPhotoForm.addEventListener('submit', handleCardFormSubmit);

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

/* ------------------------------------ удаление карточки с сервера ------------------------------------ */

export const manageCardDelete = (button, itemId, card) => {
  button.addEventListener('click', () => {
    deletePhotocard(itemId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
    });
}

/* -------------------- ставим/удаляем лайк в зависимости от того, проставлен ли он -------------------- */
export const toggleLike = (likeButton, itemId, likeCounter) => {
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

/* ------------------------------------ валидация форм ------------------------------------ */

enableValidation(validationConfig);