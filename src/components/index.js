import '../pages/index.css';
import { renderFormLoading } from "./utils.js";
import { createCard, handleCardFormSubmit } from './card.js';
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from './validate.js';
import { getUserData, changeProfileData, editAvatar, getInitialCards } from './api.js';

// кнопочки
const avatarEditButton = document.querySelector('.profile__button-avatar-container');
const profileEditButton = document.querySelector('.profile__edit-button');
const addPhotocardButton = document.querySelector('.profile__add-button');

// попапы
const popups = document.querySelectorAll('.popup')
const popupEditAvatar = document.querySelector('.popup__change-avatar');
const popupEditProfile = document.querySelector('.popup__edit-profile');
export const popupAddPhoto = document.querySelector('.popup__add-photo');

// форма для редактирования профиля
const editProfileForm = document.forms.editProfile;
const editProfileInputName = editProfileForm.elements.profileName; // инпут для имени
const editProfileInputCaption = editProfileForm.elements.profileCaption; // инпут для подписи

// данные профиля
const profileUsername = document.querySelector('.profile__username'); // имя пользователя
const profileCaption = document.querySelector('.profile__caption'); // подпись пользователя
const avatar = document.querySelector('.profile__avatar'); // аватар пользователя

// форма для редактирования аватара
const editAvatarForm = document.forms.editAvatar;
const editAvatarInputUrl = editAvatarForm.elements.avatar;

// форма для добавления карточек
const addPhotoForm = document.forms.addPhoto;
const cardsContainer = document.querySelector('.photo-cards__list'); // список всех карточек
export let myId = '';

getUserData()
  .then((res) => {
    profileUsername.textContent = res.name;
    profileCaption.textContent = res.about;
    avatar.src = res.avatar;
    myId = res._id;
  })
  .catch((err) => {
      console.log(err);
    })

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

/* -------------------------------- добавление карточек -------------------------------- */

addPhotoForm.addEventListener('submit', handleCardFormSubmit);

/* -------------------------------- открытие модального окна -------------------------------*/

avatarEditButton.addEventListener('click', function() {
  openPopup(popupEditAvatar);
})

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

profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  editProfileInputName.value = profileUsername.textContent;
  editProfileInputCaption.value = profileCaption.textContent;
});

addPhotocardButton.addEventListener('click', function () {
  openPopup(popupAddPhoto);
});

/* ----------------------------- закрытие модального окна ----------------------------*/

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    };
    if(evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  })  
})
/*--------------------------- редактирование информации 'о себе' --------------------------*/


//добавляем событие: достаем значения из полей и присваиваем их username и caption, предотвращаем обновление страницы, закрываем поп-ап
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

/* ------------------------------------ валидация форм ------------------------------------ */

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__form-item-error_active'
});