export default class UserInfo {
  constructor(
    { profileUsername, profileCaption, profileAvatar, userId },
    apiData
  ) {
    this._profileUsername = document.querySelector(profileUsername);
    this._profileCaption = document.querySelector(profileCaption);
    this._profileAvatar = document.querySelector(profileAvatar);
    this._userId = userId;
    this._apiData = apiData;
  }

  getUserInfo() {
    return this._apiData();
  }

  setUserInfo(data) {
    this._profileUsername.textContent = data.name;
    this._profileCaption.textContent = data.about;
  }

  setAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
