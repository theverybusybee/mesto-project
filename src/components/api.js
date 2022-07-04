export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

   checkResponse(res)  {
    if(res.ok) { // метод fetch возвращает объект ответа
      return res.json(); // // возвращаем результат работы метода в формате json 
    }
    return Promise.reject(`Ошибка: ${res.status}`); // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
  };


  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    })
      .then(this.checkResponse);
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    })
    .then(this.checkResponse);
  };
  
  changeProfileData(name, caption) { // создаем функцию с параметрами name и caption
    return fetch(`${this.baseUrl}/users/me`, { // получаем промис после получения результата от запроса на сервер 
      method: 'PATCH', // используем метод patch для сохранения данных профиля на сервере
      headers: this.headers, // передаем данные для авторизации через const config
      body: JSON.stringify({  // Метод JSON.stringify делает из объекта строку JSON
        name: name,
        about: caption
      })
    })
    .then(this.checkResponse);
  };

  editAvatar(photo) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH', 
      headers: this.headers, 
      body: JSON.stringify({
        avatar: photo,
      })
    })
     .then(this.checkResponse);
  };

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(this.checkResponse)
  }
  
  // для удаления карточек с сервера
    deletePhotocard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
       headers: this.headers,
    })
    .then(this.checkResponse);
  }
  
  // для постановки лайков
  addLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
       headers: this.headers,
    })
    .then(this.checkResponse);
  }
  
  // для удаления лайков
  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
       headers: this.headers,
    })
    .then(this.checkResponse);
  }


  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6',
    'Content-Type': 'application/json'
  }
}); 

const checkResponse = (res) => {
  if(res.ok) { // метод fetch возвращает объект ответа
    return res.json(); // // возвращаем результат работы метода в формате json 
  }
  return Promise.reject(`Ошибка: ${res.status}`); // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
};

// для получения данных профиля
const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(checkResponse);
};

// для смены данных профиля
const changeProfileData = (name, caption) => { // создаем функцию с параметрами name и caption
  return fetch(`${config.baseUrl}/users/me`, { // получаем промис после получения результата от запроса на сервер 
    method: 'PATCH', // используем метод patch для сохранения данных профиля на сервере
    headers: config.headers, // передаем данные для авторизации через const config
    body: JSON.stringify({  // Метод JSON.stringify делает из объекта строку JSON
      name: name,
      about: caption
    })
  })
  .then(checkResponse);
};

// для редактирования аватара
const editAvatar = (photo) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH', 
    headers: config.headers, 
    body: JSON.stringify({
      avatar: photo,
    })
  })
   .then(checkResponse);
};

// для загрузки карточек с сервера
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse);
};

// для добавления карточек
const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse)
}

// для удаления карточек с сервера
const deletePhotocard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
     headers: config.headers,
  })
  .then(checkResponse);
}

// для постановки лайков
const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
     headers: config.headers,
  })
  .then(checkResponse);
}

// для удаления лайков
const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
     headers: config.headers,
  })
  .then(checkResponse);
}

export { getUserData, changeProfileData, editAvatar, addCard, getInitialCards, deletePhotocard, addLike, removeLike }