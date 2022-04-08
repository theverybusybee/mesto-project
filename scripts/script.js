const popupEditProfile = document.querySelector('.popup__edit-profile');
const profileEditButton = document.querySelector('.profile__edit-button');

const popupAddPhoto = document.querySelector('.popup__add-photo');
const profileAddButton = document.querySelector('.profile__add-button');
const popupPhotocardPicture = document.querySelector('.popup__photocardPicture');

// активируем модальное окно посредством функции openPopup

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
}); 

profileAddButton.addEventListener('click', function () {
  openPopup(popupAddPhoto);
}); 

// закрываем модальное окно посредством функции closePopup

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


// редактирование информации 'о себе'
const profileSubmitButton = document.getElementById('profileSubmitButton'); // получили кнопку
const profileUsername = document.querySelector('.profile__username'); // имя пользователя в профиле
const profileCaption = document.querySelector('.profile__caption'); // подпись

// в функции два параметра, которые изменяют текстовое содержимое в username и caption
function editProfile(nameValue, captionValue) {
  profileUsername.textContent = nameValue;
  profileCaption.textContent = captionValue;
}

//находим поля формы
const profileFormElement = document.querySelector('.popup__form_content_profile');// получили форму
const nameInput = profileFormElement.querySelector('#profile-name');
const captionInput = profileFormElement.querySelector('#profile-caption');

// присваиваем инпутам значения из шапки профиля
nameInput.value = profileUsername.textContent;
captionInput.value = profileCaption.textContent;

//добавляем событие: достаем значения из полей и присваиваем их username и caption, предотвращаем обновление страницы, закрываем поп-ап
profileSubmitButton.addEventListener('click', function formSubmitHandler (evt) {
  editProfile(nameInput.value, captionInput.value);
  nameInput.value = profileUsername.textContent; // дублирование не оч хорошо, надо с этим чет сделать
  captionInput.value = profileCaption.textContent;
  evt.preventDefault(); 
  closePopup(popupEditProfile);
});



// добавление карточек
const addPhotoFormElement = document.querySelector('.popup__form_content_addingPhoto') //форма для добавления карточек
const submitAddPhoto = addPhotoFormElement.querySelector('.popup__submit-button'); // кнопка подтверждения добавления карточек
const cardsContainer = document.querySelector('.photo-cards__list'); // список всех карточек
const photocardTemplate = document.querySelector('.photocardTemplate').content; // template-структура
const initialCards = [
{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

const openPhotocard = document.querySelector('.popup__photocardPicture');


function addPhotocard(imageValue, captionValue) {
  const photocardElement = photocardTemplate.querySelector('.photo-cards__list-item').cloneNode(true); // клонируем содержимое template
  const photocardImage = photocardElement.querySelector('.photo-cards__list-item-image');
  photocardImage.src = imageValue; // присваиваем src значение imageValue
  photocardImage.textContent = captionValue; // заменяем содержимое подписи на captionValue
  cardsContainer.prepend(photocardElement); // располагаем карточки в начале списка
  photocardElement.querySelector('#deleteButton').addEventListener('click', (evt) => {
      evt.target.closest('.photo-cards__list-item').remove();
    });

    const likeButton = photocardElement.querySelector('.photo-cards__like-button');
    likeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-cards__like-button_active');
    });

    photocardImage.addEventListener('click', () => {
      openPhotocard.classList.add('popup_opened');
      openPhotocard.querySelector('.popup__photocardImage').src = imageValue;
      openPhotocard.querySelector('.popup__photocardCaption').textContent = captionValue;
    });
}

const placeForImage = document.querySelector('#inputForPhoto');
const placeForCaption = document.querySelector('#inputForCaption');

submitAddPhoto.addEventListener('click', function formSubmitHandler (evt) {
  addPhotocard(placeForImage.value, placeForCaption.value);
  evt.preventDefault(); 
  closePopup(popupAddPhoto);
});



initialCards.forEach ((element) => { 
  const photocardElement = photocardTemplate.querySelector('.photo-cards__list-item').cloneNode(true); // клонируем содержимое template
  const photocardImage = photocardElement.querySelector('.photo-cards__list-item-image');
  photocardImage.src = element.link; 
  photocardImage.alt = element.name; 
  photocardElement.querySelector('.photo-cards__list-item-caption').textContent = element.name;
  cardsContainer.prepend(photocardElement); // располагаем карточки в начале списка
  console.log(photocardElement);
  photocardElement.querySelector('#deleteButton').addEventListener('click', (evt) => {
      evt.target.closest('.photo-cards__list-item').remove();
    });
  const likeButton = photocardElement.querySelector('.photo-cards__like-button');
    likeButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-cards__like-button_active');
    });

    photocardImage.addEventListener('click', () => {
      openPhotocard.classList.add('popup_opened');
      openPhotocard.querySelector('.popup__photocardImage').src = element.link;
      openPhotocard.querySelector('.popup__photocardCaption').textContent = element.name;
    });
});

// открытие поп-апа по картинке
// при клике на картинку открывается попап
