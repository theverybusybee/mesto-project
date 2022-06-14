	const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '1284aa67-48fa-4d91-9cb4-d73f077756eb',
    'Content-Type': 'application/json'
  }
}

const checkResponse = (res) => {
  if(res.ok) { // метод fetch возвращает объект ответа
      return res.json(); // // возвращаем результат работы метода в формате json 
    }
    return Promise.reject(`Ошибка: ${res.status}`); // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse);
};

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(checkResponse);
};

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

const deletePhotocard = (userId) => {
  return fetch(`${config.baseUrl}/cards/${userId}`, {
    method: 'DELETE',
     headers: config.headers,
  })
  .then(checkResponse);
}

export { getUserData, changeProfileData, editAvatar, addCard, getInitialCards, deletePhotocard}