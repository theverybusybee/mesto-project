import "../pages/index.css";
import {
  avatarEditButton, // кнопка редактирования аватара
  profileEditButton, // кнопка редактирования профиля
  addPhotocardButton, // кнопка добавления карточек
  editProfileInputName, // инпут для редактирования имени
  editProfileInputCaption, // инпут для редактирования подписи
  profileUsername, // имя пользователя
  profileCaption, // подпись
  myId, // айди пользователя
  validationConfig, // набор данных для валидации
  config, // набор настроек для получения данных с сервера
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
    profileUsername: '.profile__username',
    profileCaption: '.profile__caption',
    profileAvatar: '.profile__avatar',
    userId: myId,
  },
  getUserInfo
);

Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    myId.id = userData._id;
    cards.forEach((card) => {
      const section = new Section(
        { data: card, renderer: createCard(card) },
        ".photo-cards__list"
      );
      section.addItemAppend(createCard(card));
    });
  })

  .catch((err) => {
    console.log(err);
  });

/* --------------------------- слушатели для попапа с картинкой --------------------------- */

const popupWithImage = new PopupWithImage('.popup__photocardPicture');
popupWithImage.setEventListeners();

/* -------------------------------- функциональность форм --------------------------------- */

// редактирование профиля
const editProfileForm = new PopupWithForm({
  selector: '.popup__edit-profile',
  submitCallback: (data) => {
    api
      .changeProfileData(data.profileName, data.profileCaption)
      .then((res) => {
        editProfileForm.renderFormLoading(true);
        userInfo.setUserInfo(res);
        editProfileForm.close();
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
  selector: '.popup__change-avatar',
  submitCallback: (data) => {
    api
      .editAvatar(data.avatar)
      .then((res) => {
        userInfo.setAvatar(res);
        avatarForm.renderFormLoading(true);
        avatarForm.close();
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
  selector: '.popup__add-photo',
  submitCallback: (data) => {
    api
      .addCard(data.photocardCaption, data.photocardImage)
      .then((res) => {
        addCardForm.renderFormLoading(true);
        const section = new Section(
        { renderer: createCard(res) },
        ".photo-cards__list"
      );
        section.addItemPrepend(createCard(res));
        addCardForm.close();
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
    api.addLike(card.getCardId())
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
  '.popup__form_content_profile'
);

profileFormValidation.enableValidation();

const addCardFormValidation = new FormValidator(
  validationConfig,
  '.popup__form_content_addingPhoto'
);

addCardFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(
  validationConfig,
  '.popup__form_content_editAvatar'
);

editAvatarFormValidation.enableValidation();
