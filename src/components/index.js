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
  editAvatarForm,
  editAvatarInputUrl,
  addPhotoForm,
  myId,
  addPhotoInputImage,
  addPhotoInputCaption,
  validationConfig,
  config,
} from "./constants.js";
import { renderFormLoading } from "./utils.js";
import Card from "./card.js";
import { openPopup, closePopup } from "./Popup.js";
import { enableValidation } from "./FormValidator.js";
import Api from "./Api.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm";

/* -------------------------------- открытие модального окна -------------------------------*/

avatarEditButton.addEventListener("click", function () {
  openPopup(popupEditAvatar);
});

addPhotocardButton.addEventListener("click", function () {
  openPopup(popupAddPhoto);
});

profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  editProfileInputName.value = profileUsername.textContent;
  editProfileInputCaption.value = profileCaption.textContent;
});

/* ----------------------------- закрытие модального окна ----------------------------*/

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

addPhotoForm.addEventListener("submit", handleCardFormSubmit);

function handleCardFormSubmit(e) {
  renderFormLoading(true, addPhotoForm);
  addCard(addPhotoInputCaption.value, addPhotoInputImage.value)
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
}

/* ------------------------------------ удаление карточки с сервера ------------------------------------ */

export const manageCardDelete = (button, itemId, card) => {
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

/* -------------------- ставим/удаляем лайк в зависимости от того, проставлен ли он -------------------- */
export const toggleLike = (likeButton, itemId, likeCounter) => {
  likeButton.addEventListener("click", () => {
    if (likeButton.classList.contains("photo-cards__like-button_active")) {
      removeLike(itemId)
        .then((res) => {
          likeButton.classList.remove("photo-cards__like-button_active");
          displayLikesAmount(likeCounter, res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addLike(itemId)
        .then((res) => {
          likeButton.classList.add("photo-cards__like-button_active");
          displayLikesAmount(likeCounter, res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

/* ------------------------------------ валидация форм ------------------------------------ */

enableValidation(validationConfig);

const api = new Api(config);

function getUserInfo() {
  return api.getUserData();
}

const userInfo = new UserInfo(
  {
    profileUsername: editProfileInputName,
    profileCaption: editProfileInputCaption,
    profileAvatar: editAvatarInputUrl,
  },
  getUserInfo
);

userInfo.getUserInfo().then((res) => {
  profileUsername.textContent = res.name;
  profileCaption.textContent = res.about;
  avatar.src = res.avatar;
});

api.getInitialCards().then((items) => {
  items.forEach((item) => {
    const card = new Card(item, ".photocardTemplate");
    const cardElement = card.generate();
    document.querySelector(".photo-cards__list").append(cardElement);
  });
});
