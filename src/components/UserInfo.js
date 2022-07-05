import Api from "./Api.js";

export default class UserInfo {
  constructor({ profileUsername, profileCaption, profileAvatar }, apiData) {
    this._profileUsername = profileUsername;
    this._profileCaption = profileCaption;
    this._profileAvatar = profileAvatar;
    this._apiData = apiData;
  }

  getUserInfo() {
    return this._apiData();
  }

  setUserInfo(data) {
    this._profileUsername.textContent = data.name;
    this._profileCaption.textContent = data.about;
  }
}

/* -------------------------------- редактирование профиля ---------------------------------- */

/*// редактирование аватара
editAvatarForm.addEventListener('submit', function(evt) {
  renderFormLoading(true, editAvatarForm);
  editAvatar(editAvatarInputUrl.value)
    .then((res) => {
      avatar.src = res.avatar;
      evt.target.reset();
      closePopup(popupEditAvatar);
      editAvatarForm.elements.submitButton.disabled = true;  
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderFormLoading(false, editAvatarForm);
    })
})

// редактирование информации 'о себе'
// добавляем событие: достаем значения из полей и присваиваем их username и caption, отправляем данные на сервер, закрываем поп-ап
editProfileForm.addEventListener('submit', () => {
  renderFormLoading(true, editProfileForm);
  changeProfileData(editProfileInputName.value, editProfileInputCaption.value)
    .then((res) => {
      profileUsername.textContent = res.name
      profileCaption.textContent = res.about
      closePopup(popupEditProfile)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderFormLoading(false, editProfileForm);
    })
});*/
