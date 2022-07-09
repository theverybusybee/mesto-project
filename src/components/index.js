import "../pages/index.css";
import {
  avatarEditButton,
  profileEditButton,
  addPhotocardButton,
  popups,
  popupEditAvatar,
  popupEditProfile,
  popupAddPhoto,
  editProfileInputName,
  editProfileInputCaption,
  profileUsername,
  profileCaption,
  avatar,
  myId,
  validationConfig,
  config,
  popupOpenPhotocard,
} from "./constants.js";
import { renderFormLoading } from "./utils.js";
import Card from "./card.js";
import { enableValidation } from "./FormValidator.js";
import Api from "./Api.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm";
import PopupWithImage from "./PopupWithImage";

const api = new Api(config);

function getUserInfo() {
  return api.getUserData();
}
const userInfo = new UserInfo(
  {
    profileUsername: profileUsername,
    profileCaption: profileCaption,
    profileAvatar: avatar,
    userId: myId,
  },
  getUserInfo
);

userInfo.getUserInfo().then((res) => {
  profileUsername.textContent = res.name;
  profileCaption.textContent = res.about;
  avatar.src = res.avatar;
  myId.id = res._id;
});

const popupWithImage = new PopupWithImage(popupOpenPhotocard);
popupWithImage.setEventListeners();

/* -------------------- ставим/удаляем лайк в зависимости от того, проставлен ли он -------------------- */

const toggleLike = (evt, card) => {
  if (evt.target.classList.contains("photo-cards__like-button_active")) {
    api.removeLike(card.getCardId())
      .then((res) => {
        card.removeLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (!evt.target.classList.contains("photo-cards__like-button_active")) {
    api.addLike(card.getCardId())
      .then((res) => {
        card.addLike(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

api.getInitialCards().then((items) => {
  items.forEach((evt) => {
    const card = new Card(
      evt,
      ".photocardTemplate",
      () => {
        popupWithImage.open(evt);
      },
      toggleLike,
      myId.id
    );
    const cardElement = card.generate();
    const section = new Section(
      { data: evt, renderer: cardElement },
      ".photo-cards__list"
    );
    section.addItem(cardElement);
  });
});

/* -------------------------------- открытие модального окна -------------------------------*/

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

/* ----------------------------- закрытие модального окна ----------------------------*/
/*
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});
*/
const avatarForm = new PopupWithForm({
  selector: popupEditAvatar,
  submitCallback: (data) => {
    api.editAvatar(data.avatar).then((res) => {
      userInfo.setAvatar(res);
    });
  },
});

avatarForm.setEventListeners();

const addCardForm = new PopupWithForm({
  selector: popupAddPhoto,
  submitCallback: (data) => {
    api.addCard(data.photocardCaption, data.photocardImage).then((res) => {
      const AddedCard = new Card(res, ".photocardTemplate");
      const cardElement = AddedCard.generate();
      document.querySelector(".photo-cards__list").prepend(cardElement);
    });
  },
});

addCardForm.setEventListeners();

const editProfileForm = new PopupWithForm({
  selector: popupEditProfile,
  submitCallback: (data) => {
    api.changeProfileData(data.profileName, data.profileCaption).then((res) => {
      userInfo.setUserInfo(res);
    });
  },
});

editProfileForm.setEventListeners();
/*


/* ----------------------------- получаем данные пользователя и карточек ------------------------------ */
/* Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    saveUserData(userData);
    renderItems(cards)
  })
  .catch(err => {
    console.log(err);
  });

  const saveUserData = (data) => {
    profileUsername.textContent = data.name;
    profileCaption.textContent = data.about;
    avatar.src = data.avatar;
    myId.id = data._id;
  } */

/* --------------------------------- добавление карточек --------------------------------- */

/*addPhotoForm.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(e) {
  renderFormLoading(true, addPhotoForm);
  const card = new Card()
  card.generate()
    .then((res) => {
      addPhotocard(res);
      addPhotoForm.reset();
      addPhotoForm.elements.submitButton.disabled = true;
      closePopup(popupAddPhoto);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderFormLoading(false, addPhotoForm);
    });
}*/

/* ------------------------------------ удаление карточки с сервера ------------------------------------ */

const manageCardDelete = (button, itemId, card) => {
  button.addEventListener("click", () => {
    deletePhotocard(itemId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

/* ------------------------------------ валидация форм ------------------------------------ */

enableValidation(validationConfig);
