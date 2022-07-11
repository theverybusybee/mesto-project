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
import { renderFormLoading } from "../components/utils.js";
import Card from "../components/Card.js";
import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";

/* -------------------------------- открытие модального окна ------------------------------ */

avatarEditButton.addEventListener("click", function () {
  avatarForm.open();
});

addPhotocardButton.addEventListener("click", function () {
  addCardForm.open();
});

profileEditButton.addEventListener("click", function () {
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

userInfo
  .getUserInfo()
  .then((res) => {
    profileUsername.textContent = res.name;
    profileCaption.textContent = res.about;
    avatar.src = res.avatar;
    myId.id = res._id;
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
    editProfileForm.renderFormLoading(true);
    api
      .changeProfileData(data.profileName, data.profileCaption)
      .then((res) => {
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
    avatarForm.renderFormLoading(true);
    api
      .editAvatar(data.avatar)
      .then((res) => {
        userInfo.setAvatar(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfileForm.renderFormLoading(false);
      });
  },
});

avatarForm.setEventListeners();

// добавление карточек
const addCardForm = new PopupWithForm({
  selector: popupAddPhoto,
  submitCallback: (data) => {
    addCardForm.renderFormLoading(true);
    api
      .addCard(data.photocardCaption, data.photocardImage)
      .then((res) => {
        const AddedCard = new Card(
          res,
          ".photocardTemplate",
          () => {
            popupWithImage.open(res);
          },
          toggleLike,
          myId.id,
          manageCardDelete
        );
        const cardElement = AddedCard.generate();
        document.querySelector(".photo-cards__list").prepend(cardElement);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editProfileForm.renderFormLoading(false);
      });
  },
});

addCardForm.setEventListeners();

/* --------------------------------- добавление карточек ---------------------------------- */

api
  .getInitialCards()
  .then((items) => {
    items.forEach((evt) => {
      const card = new Card(
        evt,
        ".photocardTemplate",
        () => {
          popupWithImage.open(evt);
        },
        toggleLike,
        myId.id,
        manageCardDelete
      );
      const cardElement = card.generate();
      const section = new Section(
        { data: evt, renderer: cardElement },
        ".photo-cards__list"
      );
      section.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

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

const avatarFormValidation = new FormValidator(
  validationConfig,
  addPhotoFormElement
);

avatarFormValidation.enableValidation();

const editAvatarFormValidation = new FormValidator(
  validationConfig,
  editAvatarFormElement
);

editAvatarFormValidation.enableValidation();
