import '../pages/index.css';
import { avatarEditButton, profileEditButton, addPhotocardButton, popups, popupEditAvatar, popupEditProfile,  popupAddPhoto, editProfileForm, editProfileInputName, editProfileInputCaption, profileUsername, profileCaption, avatar, editAvatarForm, editAvatarInputUrl, addPhotoForm, cardsContainer, myId } from './const.js'
import { renderFormLoading } from "./utils.js";
import { createCard, handleCardFormSubmit } from './card.js';
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from './validate.js';
import { getUserData, changeProfileData, editAvatar, getInitialCards } from './api.js';

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

/* -------------------------------- получаем данные пользователя -------------------------------- */
getUserData()
  .then((res) => {
    profileUsername.textContent = res.name;
    profileCaption.textContent = res.about;
    avatar.src = res.avatar;
    myId.id = res._id;
  })
  .catch((err) => {
    console.log(err);
  })

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

/* ------------------------------ получаем данные карточек с сервера ------------------------------ */

  getInitialCards() 
  .then((res) => {
    res.forEach((element) => {
      const photocardElement = createCard(element)
      cardsContainer.append(photocardElement); // располагаем карточки в начале списка
    });
  })
  .catch((err) => {
    console.log(err);
  })

/* --------------------------------- добавление карточек --------------------------------- */

addPhotoForm.addEventListener('submit', handleCardFormSubmit);

/* ------------------------------------ валидация форм ------------------------------------ */

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__form-item-error_active'
});