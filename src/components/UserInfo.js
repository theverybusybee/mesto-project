export default class UserInfo {
  constructor(
    { profileUsername, profileCaption, profileAvatar, userId },
    apiData
  ) {
    this._profileUsername = profileUsername;
    this._profileCaption = profileCaption;
    this._profileAvatar = profileAvatar;
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
