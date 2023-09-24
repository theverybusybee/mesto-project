// кнопочки
export const avatarEditButton = document.querySelector('.profile__button-avatar-container');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addPhotocardButton = document.querySelector('.profile__add-button');

// форма для редактирования профиля
export const editProfileFormElement = document.forms.editProfile;
export const editProfileInputName = editProfileFormElement.elements.profileName; // инпут для имени
export const editProfileInputCaption = editProfileFormElement.elements.profileCaption; // инпут для подписи

// данные профиля
export const profileUsername = document.querySelector('.profile__username'); // имя пользователя
export const profileCaption = document.querySelector('.profile__caption'); // подпись пользователя

// id пользователя
export const myId = {
  id: '',
} ;

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__form-item-error_active'
}

export const config = {
  // baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  baseUrl: 'http://domainname.theverybusybee.nomoredomainsrocks.ru',
  headers: {
    authorization: '1284aa67-48fa-4d91-9cb4-d73f077756eb',
    'Content-Type': 'application/json'
  }
}