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

// редактирование аватара
/*
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
*/