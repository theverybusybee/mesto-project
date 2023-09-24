export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  checkResponse(res) {
    if (res.ok) {
      // метод fetch возвращает объект ответа
      return res.json(); // // возвращаем результат работы метода в формате json
    }
    return Promise.reject(`Ошибка: ${res.status}`); // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
  }

  // для загрузки карточек с сервера
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this.checkResponse);
  }

  // для получения данных профиля
  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this.checkResponse);
  }

  // для смены данных профиля
  changeProfileData(name, caption) {
    // создаем функцию с параметрами name и caption
    return fetch(`${this.baseUrl}/users/me`, {
      // получаем промис после получения результата от запроса на сервер
      method: "PATCH", // используем метод patch для сохранения данных профиля на сервере
      headers: this.headers, // передаем данные для авторизации через const config
      body: JSON.stringify({
        // Метод JSON.stringify делает из объекта строку JSON
        name: name,
        about: caption,
      }),
    }).then(this.checkResponse);
  }

  // для редактирования аватара
  editAvatar(photo) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: photo,
      }),
    }).then(this.checkResponse);
  }

  // для добавления карточек
  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.checkResponse);
  }

  // для удаления карточек с сервера
  deletePhotocard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  // для постановки лайков
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this.headers,
    }).then(this.checkResponse);
  }

  // для удаления лайков
  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.checkResponse);
  }
}
