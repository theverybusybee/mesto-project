export const page = document.querySelector('.page');

// кнопочки
export const avatarEditButton = document.querySelector('.profile__button-avatar-container');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const addPhotocardButton = document.querySelector('.profile__add-button');

// попапы
export const popups = document.querySelectorAll('.popup')
export const popupEditAvatar = document.querySelector('.popup__change-avatar');
export const popupEditProfile = document.querySelector('.popup__edit-profile');
export const popupAddPhoto = document.querySelector('.popup__add-photo');

// карточки
export const photocardTemplate = document.querySelector('.photocardTemplate').content; // содержимое template
export const cardsContainer = document.querySelector('.photo-cards__list'); // список всех карточек

// попап с карточкой
export const popupOpenPhotocard = document.querySelector('.popup__photocardPicture');
export const popupPhotocardImage = popupOpenPhotocard.querySelector('.popup__photocardImage');
export const popupPhotocardCaption = popupOpenPhotocard.querySelector('.popup__photocardCaption');

// форма для добавления карточек
export const addPhotoForm = document.forms.addPhoto;
export const addPhotoInputImage = addPhotoForm.elements.photocardImage;
export const addPhotoInputCaption = addPhotoForm.elements.photocardCaption;

// форма для редактирования профиля
export const editProfileForm = document.forms.editProfile;
export const editProfileInputName = editProfileForm.elements.profileName; // инпут для имени
export const editProfileInputCaption = editProfileForm.elements.profileCaption; // инпут для подписи

// данные профиля
export const profileUsername = document.querySelector('.profile__username'); // имя пользователя
export const profileCaption = document.querySelector('.profile__caption'); // подпись пользователя
export const avatar = document.querySelector('.profile__avatar'); // аватар пользователя

// форма для редактирования аватара
export const editAvatarForm = document.forms.editAvatar;
export const editAvatarInputUrl = editAvatarForm.elements.avatar;

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
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '1284aa67-48fa-4d91-9cb4-d73f077756eb',
    'Content-Type': 'application/json'
  }
}