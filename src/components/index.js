import '../pages/index.css';
import { createCard, handleCardFormSubmit } from './card.js';
import { openPopup, closePopup } from "./modal.js";
import { enableValidation } from './validate.js';

// body
const page = document.querySelector('.page');

// кнопочки
const avatarEditButton = document.querySelector('.profile__button-avatar-container');
const profileEditButton = document.querySelector('.profile__edit-button');
const addPhotocardButton = document.querySelector('.profile__add-button');

// попапы
const popupEditAvatar = document.querySelector('.popup__change-avatar');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddPhoto = document.querySelector('.popup__add-photo');

// кнопки закрытия модальных окон
const popupCloseButtons = document.querySelectorAll('.popup__close-button');

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

// карточки
const cardsContainer = document.querySelector('.photo-cards__list'); // список всех карточек

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

initialCards.forEach((element) => {
  const photocardElement = createCard(element)
  cardsContainer.append(photocardElement); // располагаем карточки в начале списка
});

/* -------------------------------- добавление карточек -------------------------------- */

addPhotoForm.addEventListener('submit', handleCardFormSubmit);

/* -------------------------------- открытие модального окна -------------------------------*/

avatarEditButton.addEventListener('click', function() {
  openPopup(popupEditAvatar);
})

editAvatarForm.addEventListener('submit', function(evt) {
  avatar.src = editAvatarInputUrl.value;
  evt.preventDefault();
  closePopup(popupEditAvatar);
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

// закрываем поп-апы по клику на крестик
popupCloseButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    closePopup(evt.target.parentElement.parentElement);
  })
})

// закрываем поп-ап кликом на область вокруг форм
  page.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
       closePopup(evt.target);
    };
  });

  /*--------------------------- редактирование информации 'о себе' --------------------------*/

// в функции два параметра, которые изменяют текстовое содержимое в username и caption
function editProfile(nameValue, captionValue) {
  profileUsername.textContent = nameValue;
  profileCaption.textContent = captionValue;
}

//добавляем событие: достаем значения из полей и присваиваем их username и caption, предотвращаем обновление страницы, закрываем поп-ап
editProfileForm.addEventListener('submit', (evt) => {
  editProfile(editProfileInputName.value, editProfileInputCaption.value);
  evt.preventDefault();
  closePopup(popupEditProfile);
});

/* ------------------------------------ валидация форм ------------------------------------ */

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__form-item-error_active'
});