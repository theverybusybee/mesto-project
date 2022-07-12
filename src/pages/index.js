import "../pages/index.css";
import {
  avatarEditButton, // кнопка редактирования аватара
  profileEditButton, // кнопка редактирования профиля
  addPhotocardButton, // кнопка добавления карточек
  popupEditAvatar, // попап редактирования аватара
  popupEditProfile, // попап редактирования профиля
  popupAddPhoto, // попап добавления карточек
  editProfileFormElement, // форма редактирования профиля
  addPhotoFormElement, // форма добавления карточек
  editAvatarFormElement, // форма редактирования аватара
  editProfileInputName, // инпут для редактирования имени
  editProfileInputCaption, // инпут для редактирования подписи
  profileUsername, // имя пользователя
  profileCaption, // подпись
  avatar,
  myId, // айди пользователя
  validationConfig, // набор данных для валидации
  config, // набор настроек для получения данных с сервера
  popupOpenPhotocard, // попап с картинкой
} from "../components/constants.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";

/* -------------------------------- открытие модального окна ------------------------------ */

avatarEditButton.addEventListener("click", function () {
  editAvatarFormValidation.resetValidation();
  avatarForm.open();
});

addPhotocardButton.addEventListener("click", function () {
  addCardFormValidation.resetValidation();
  addCardForm.open();
});

profileEditButton.addEventListener("click", function () {
  profileFormValidation.resetValidation();
  editProfileForm.open();
  editProfileInputName.value = profileUsername.textContent;
  editProfileInputCaption.value = profileCaption.textContent;
});

/* ------------------------------ получаем данные c cервера ------------------------------- */

const api = new Api(config);

function getUserInfo() {
  return api.getUserData();
}

/* ---------------------------- сохраняем данные пользователя ----------------------------- */

const userInfo = new UserInfo(
  {
    profileUsername: profileUsername,
    profileCaption: profileCaption,
    profileAvatar: avatar,
    userId: myId,
  },
  getUserInfo
);

Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    myId.id = userData._id;

    cards.forEach((evt) => {
      const section = new Section(
        { data: evt, renderer: createCard(evt) },
        ".photo-cards__list"
      );
      section.addItem(createCard(evt));
    });
  })

  .catch((err) => {
    console.log(err);
  });

/* --------------------------- слушатели для попапа с картинкой --------------------------- */

const popupWithImage = new PopupWithImage(popupOpenPhotocard);
popupWithImage.setEventListeners();

/* -------------------------------- функциональность форм --------------------------------- */

// редактирование профиля
const editProfileForm = new PopupWithForm({
  selector: popupEditProfile,
  submitCallback: (data) => {
    api
      .changeProfileData(data.profileName, data.profileCaption)
      .then((res) => {
        editProfileForm.renderFormLoading(true);
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfileForm.renderFormLoading(false);
      });
  },
});

editProfileForm.setEventListeners();

// редактирование аватарки
const avatarForm = new PopupWithForm({
  selector: popupEditAvatar,
  submitCallback: (data) => {
    api
      .editAvatar(data.avatar)
      .then((res) => {
        userInfo.setAvatar(res);
        avatarForm.renderFormLoading(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        avatarForm.renderFormLoading(false);
      });
  },
});

avatarForm.setEventListeners();

// добавление карточек
const addCardForm = new PopupWithForm({
  selector: popupAddPhoto,
  submitCallback: (data) => {
    api
      .addCard(data.photocardCaption, data.photocardImage)
      .then((res) => {
        addCardForm.renderFormLoading(true);
        document.querySelector(".photo-cards__list").prepend(createCard(res));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        addCardForm.renderFormLoading(false);
      });
  },
});

addCardForm.setEventListeners();

/* --------------------------------- добавление карточек ---------------------------------- */

function createCard(item) {
  const card = new Card(
    item,
    ".photocardTemplate",
    () => {
      popupWithImage.open(item);
    },
    toggleLike,
    myId.id,
    manageCardDelete
  );
  const cardElement = card.generate();
  return cardElement;
}

/* ------------- ставим/удаляем лайк в зависимости от того, проставлен ли он -------------- */

const toggleLike = (evt, card) => {
  if (evt.target.classList.contains("photo-cards__like-button_active")) {
    api
      .removeLike(card.getCardId())
      .then((res) => {
        card.removeLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (
    !evt.target.classList.contains("photo-cards__like-button_active")
  ) {
    api
      .addLike(card.getCardId())
      .then((res) => {
        card.addLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

/* ----------------------------- удаление карточки с сервера ------------------------------ */

const manageCardDelete = (evt, card, cardElement) => {
  if (evt.target.classList.contains("photo-cards__delete-button_type_active"))
    api
      .deletePhotocard(card.getCardId())
      .then(() => {
        cardElement.remove();
      })
      .catch((err) => {
        console.log(err);
      });
};

/* ------------------------------------ валидация форм ------------------------------------ */

const profileFormValidation = new FormValidator(
  validationConfig,
  editProfileFormElement
);

profileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(
  validationConfig,
  addPhotoFormElement
);

addCardFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(
  validationConfig,
  editAvatarFormElement
);

editAvatarFormValidation.enableValidation();
