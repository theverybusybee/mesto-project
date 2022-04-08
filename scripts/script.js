const popupEditProfile = document.querySelector('.popup__edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupAddPhoto = document.querySelector('.popup__add-photo');
const profileAddButton = document.querySelector('.profile__add-button');
const popupPhotocardPicture = document.querySelector('.popup__photocardPicture');

/* -------------------------------- открытие модального окна -------------------------------*/

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
}); 

profileAddButton.addEventListener('click', function () {
  openPopup(popupAddPhoto);
}); 

/* -------------------------------- закрытие модального окна -------------------------------*/

const popupAddCloseButton = document.querySelector('.popup__add-photo > .popup__container > .popup__close-button');
const popupEditCloseButton = document.querySelector('.popup__edit-profile > .popup__container > .popup__close-button');
const popupPhotocardCloseButton = document.querySelector('.popup__photocardPicture > .popup__photocardImageContainer > .popup__close-button');

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
}); 

popupAddCloseButton.addEventListener('click', function () {
  closePopup(popupAddPhoto);
}); 

popupPhotocardCloseButton.addEventListener('click', function () {
  closePopup(popupPhotocardPicture);
}); 


/*------------------------------редактирование информации 'о себе'-----------------------------*/

const profileSubmitButton = document.getElementById('profileSubmitButton'); // получили кнопку
const profileUsername = document.querySelector('.profile__username'); // имя пользователя в профиле
const profileCaption = document.querySelector('.profile__caption'); // подпись

//находим поля формы
const profileFormElement = document.querySelector('.popup__form_content_profile');// получили форму
const nameInput = profileFormElement.querySelector('#profile-name');
const captionInput = profileFormElement.querySelector('#profile-caption');

// в функции два параметра, которые изменяют текстовое содержимое в username и caption
function editProfile(nameValue, captionValue) {
  profileUsername.textContent = nameValue;
  profileCaption.textContent = captionValue;
 
}

nameInput.value = profileUsername.textContent; // дублирование не оч хорошо, надо с этим чет сделать
  captionInput.value = profileCaption.textContent;

//добавляем событие: достаем значения из полей и присваиваем их username и caption, предотвращаем обновление страницы, закрываем поп-ап
profileSubmitButton.addEventListener('click', function formSubmitHandler (evt) {
  editProfile(nameInput.value, captionInput.value);
  nameInput.value = profileUsername.textContent; // дублирование не оч хорошо, надо с этим чет сделать
  captionInput.value = profileCaption.textContent;
  evt.preventDefault(); 
  closePopup(popupEditProfile);
  profileUsername.textContent = nameValue;
  profileCaption.textContent = captionValue;
});


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
  link: 'https://images.unsplash.com/photo-1553669120-546a47f7a7c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
},
{
  name: 'Lotus',
  link: 'https://images.unsplash.com/photo-1616435577207-ca90abc6b732?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
},
{
  name: 'Crocuses',
  link: 'https://images.unsplash.com/photo-1550595781-9b3686713647?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
},
];

const addPhotoFormElement = document.querySelector('.popup__form_content_addingPhoto') //форма для добавления карточек
const submitAddPhoto = addPhotoFormElement.querySelector('.popup__submit-button'); // кнопка подтверждения добавления карточек
const cardsContainer = document.querySelector('.photo-cards__list'); // список всех карточек
const photocardTemplate = document.querySelector('.photocardTemplate').content; // содержимое template
const openPhotocard = document.querySelector('.popup__photocardPicture'); // кнопка открытия карточки
const placeForImage = document.querySelector('#inputForPhoto');
const placeForCaption = document.querySelector('#inputForCaption');


initialCards.forEach ((element) => { 
  const photocardElement = photocardTemplate.querySelector('.photo-cards__list-item').cloneNode(true); // клонируем содержимое template
  const photocardImage = photocardElement.querySelector('.photo-cards__list-item-image');
  const photocardCaption = photocardElement.querySelector('.photo-cards__list-item-caption');
  const likeButton = photocardElement.querySelector('.photo-cards__like-button');

  photocardImage.src = element.link; 
  photocardImage.alt = element.name; 
  photocardCaption.textContent = element.name;
  cardsContainer.append(photocardElement); // располагаем карточки в начале списка

  photocardElement.querySelector('#deleteButton').addEventListener('click', (evt) => {
      evt.target.closest('.photo-cards__list-item').remove();
    });

    likeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-cards__like-button_active');
    });

    photocardImage.addEventListener('click', () => {
      openPhotocard.classList.add('popup_opened');
      openPhotocard.querySelector('.popup__photocardImage').src = element.link;
      openPhotocard.querySelector('.popup__photocardCaption').textContent = element.name;
    });
});

/* -------------------------------------- добавление карточек ----------------------------------- */


function addPhotocard(imageValue, captionValue) {
  const photocardElement = photocardTemplate.querySelector('.photo-cards__list-item').cloneNode(true); // клонируем содержимое template
  const photocardImage = photocardElement.querySelector('.photo-cards__list-item-image');
  const photocardCaption = photocardElement.querySelector('.photo-cards__list-item-caption');
  const likeButton = photocardElement.querySelector('.photo-cards__like-button');

  photocardImage.src = imageValue; // присваиваем src значение imageValue
  photocardImage.alt = captionValue; // присваиваем src значение imageValue
  photocardCaption.textContent = captionValue; // заменяем содержимое подписи на captionValue

  cardsContainer.prepend(photocardElement); // располагаем карточки в начале списка
  photocardElement.querySelector('#deleteButton').addEventListener('click', (evt) => {
      evt.target.closest('.photo-cards__list-item').remove();
    });

    likeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-cards__like-button_active');
    });

    photocardImage.addEventListener('click', () => {
      openPhotocard.classList.add('popup_opened');
      openPhotocard.querySelector('.popup__photocardImage').src = imageValue;
      openPhotocard.querySelector('.popup__photocardCaption').textContent = captionValue;
    });
}

submitAddPhoto.addEventListener('click', function formSubmitHandler (evt) {
  addPhotocard(placeForImage.value, placeForCaption.value);
  evt.preventDefault(); 
  closePopup(popupAddPhoto);
  placeForImage.value = ''; // очищаем поля для ввода
  placeForCaption.value = '';
});
