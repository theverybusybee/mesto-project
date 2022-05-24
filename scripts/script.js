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
const popupOpenPhotocard = document.querySelector('.popup__photocardPicture');
const popupPhotocardImage = popupOpenPhotocard.querySelector('.popup__photocardImage');
const popupPhotocardCaption = popupOpenPhotocard.querySelector('.popup__photocardCaption');

// кнопки закрытия модальных окон
const popupAddCloseButton = document.querySelector('.popup__add-photo > .popup__container > .popup__close-button');
const popupEditCloseButton = document.querySelector('.popup__edit-profile > .popup__container > .popup__close-button');
const popupPhotocardCloseButton = document.querySelector('.popup__photocardPicture > .popup__photocardImageContainer > .popup__close-button');
const popupEditAvatarCloseButton = document.querySelector('.popup__change-avatar > .popup__container > .popup__close-button');

// форма для добавления карточек
const addPhotoForm = document.forms.addPhoto;
const addPhotoInputImage = addPhotoForm.elements.photocardImage;
const addPhotoInputCaption = addPhotoForm.elements.photocardCaption;

// карточки
const cardsContainer = document.querySelector('.photo-cards__list'); // список всех карточек
const photocardTemplate = document.querySelector('.photocardTemplate').content; // содержимое template

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

/* -------------------------------- открытие модального окна -------------------------------*/

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

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

/* -------------------------------- закрытие модального окна -------------------------------*/


popupEditCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

popupAddCloseButton.addEventListener('click', function () {
  closePopup(popupAddPhoto);
});

popupPhotocardCloseButton.addEventListener('click', function () {
  closePopup(popupOpenPhotocard);
});

popupEditAvatarCloseButton.addEventListener('click', function () {
  closePopup(popupOpenPhotocard);
});


/*------------------------------редактирование информации 'о себе'-----------------------------*/


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

function createCard(item) {
  const photocardElement = photocardTemplate.querySelector('.photo-cards__list-item').cloneNode(true); // клонируем содержимое template
  const photocardImage = photocardElement.querySelector('.photo-cards__list-item-image');
  const photocardCaption = photocardElement.querySelector('.photo-cards__list-item-caption');
  const likeButton = photocardElement.querySelector('.photo-cards__like-button');

  photocardImage.src = item['link']; // присваиваем src значение imageValue
  photocardImage.alt = item['name']; // присваиваем src значение imageValue
  photocardCaption.textContent = item['name']; // заменяем содержимое подписи на captionValue

  photocardElement.querySelector('#deleteButton').addEventListener('click', (evt) => {
    evt.target.closest('.photo-cards__list-item').remove();
  });

  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-cards__like-button_active');
  });

  photocardImage.addEventListener('click', () => {
    openPopup(popupOpenPhotocard);
    popupPhotocardImage.src = item['link']; // присваиваем src значение imageValue
    popupPhotocardImage.alt = item['name']; // присваиваем src значение imageValue
    popupPhotocardCaption.textContent = item['name']; // заменяем содержимое подписи на captionValue
  });
  return photocardElement;
}

initialCards.forEach((element) => {
  const photocardElement = createCard(element)
  cardsContainer.append(photocardElement); // располагаем карточки в начале списка
});

/* -------------------------------------- добавление карточек ----------------------------------- */

function addPhotocard(card) {
  const photocardElement = createCard(card);
  cardsContainer.prepend(photocardElement);
}

function handleCardFormSubmit(evt) {
  addPhotocard({ name: addPhotoInputCaption.value, link: addPhotoInputImage.value });
  evt.preventDefault();
  closePopup(popupAddPhoto);
  addPhotoForm.reset();
}

addPhotoForm.addEventListener('submit', handleCardFormSubmit);

  page.addEventListener('keydown', function(evt) {
    if ((evt.key === 'Escape')) {
      closePopup(page.querySelector('.popup_opened'));
    };
  });

  page.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
       closePopup(evt.target);
    };
  });