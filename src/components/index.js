import '../pages/index.css';
import { avatarEditButton, profileEditButton, addPhotocardButton, popups, popupEditAvatar, popupEditProfile,  popupAddPhoto, editProfileForm, editProfileInputName, editProfileInputCaption, profileUsername, profileCaption, avatar, editAvatarForm, editAvatarInputUrl, addPhotoForm, myId, addPhotoInputImage, addPhotoInputCaption, validationConfig, config } from './constants.js'
import { renderFormLoading } from "./utils.js";
import { renderItems, addPhotocard, displayLikesAmount } from './Card.js';
import { openPopup, closePopup } from "./Popup.js";
import { enableValidation } from './FormValidator.js';
import Api from './Api.js';
import UserInfo from './UserInfo.js'


/* -------------------------------- открытие модального окна -------------------------------*/
const api = new Api(config);

function getUserInfo() {
  return api.getUserData();
}

const userInfo = new UserInfo({ profileUsername: editProfileInputName, profileCaption: editProfileInputCaption, profileAvatar: editAvatarInputUrl }, getUserInfo);

userInfo.getUserInfo()
.then((res) => {
  profileUsername.textContent = res.name;
  profileCaption.textContent = res.about;
  avatar.src = res.avatar;
});

// редактирование информации 'о себе'
// добавляем событие: достаем значения из полей и присваиваем их username и caption, отправляем данные на сервер, закрываем поп-ап 

editProfileForm.addEventListener('submit', () => {
  api.changeProfileData()
  //renderFormLoading(true, editProfileForm);

  

  //api.changeProfileData({editProfileInputName.value, editProfileInputCaption.value})
   // .then((res) => {
   //   profileUsername.textContent = res.name
    //  profileCaption.textContent = res.about
    //  closePopup(popupEditProfile)
  //  })
   // .catch((err) => {
   //   console.log(err);
  //  })
  //  .finally(() => {
     // renderFormLoading(false, editProfileForm);
//    })  
});

avatarEditButton.addEventListener('click', function() {
  openPopup(popupEditAvatar);
})

addPhotocardButton.addEventListener('click', function () {
  openPopup(popupAddPhoto);
});

profileEditButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  editProfileInputName.value = profileUsername.textContent;
  editProfileInputCaption.value = profileCaption.textContent;
});

/* ----------------------------- закрытие модального окна ----------------------------*/



/* ----------------------------- получаем данные пользователя и карточек ------------------------------ */
/*
Promise.all([userInfo.getUserInfo(), getInitialCards()])
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
  } 
*/
/* --------------------------------- добавление карточек --------------------------------- */

addPhotoForm.addEventListener('submit', handleCardFormSubmit);

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
    })
}

/* ------------------------------------ удаление карточки с сервера ------------------------------------ */

export const manageCardDelete = (button, itemId, card) => {
  button.addEventListener('click', () => {
    deletePhotocard(itemId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(err);
      });
    });
}

/* -------------------- ставим/удаляем лайк в зависимости от того, проставлен ли он -------------------- */
export const toggleLike = (likeButton, itemId, likeCounter) => {
  likeButton.addEventListener('click', () => {
    if(likeButton.classList.contains('photo-cards__like-button_active')) {
      removeLike(itemId)
      .then((res) => {
        likeButton.classList.remove('photo-cards__like-button_active');
        displayLikesAmount(likeCounter, res);
      })
      .catch((err) => {
        console.log(err);
      })} else {
        addLike(itemId)
        .then((res) => {
          likeButton.classList.add('photo-cards__like-button_active');
          displayLikesAmount(likeCounter, res);
        })
        .catch((err) => {
          console.log(err);
        });
      };
    });
  }

/* ------------------------------------ валидация форм ------------------------------------ */

enableValidation(validationConfig);