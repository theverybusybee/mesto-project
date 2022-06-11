	const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-11',
  headers: {
    authorization: '1284aa67-48fa-4d91-9cb4-d73f077756eb',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const changeProfileData = (name, caption) => { // создаем функцию с параметрами name и caption
  return fetch(`${config.baseUrl}/users/me`, { // получаем промис после получения результата от запроса на сервер 
    method: 'PATCH', // спользуем метод patch для сохранения данных профиля на сервере
    headers: config.headers, // передаем данные для авторизации через const config
    body: JSON.stringify({  // Метод JSON.stringify делает из объекта строку JSON
      name: name, //
      about: caption
    })
  })
  .then((res) => { // Метод fetch возвращает объект ответа
    if(res.ok) {
      return res.json(); // // возвращаем результат работы метода в формате json 
    }
    return Promise.reject(`Ошибка: ${res.status}`); // отклоняем промис, чтобы перейти в блок catch, если сервер вернул ошибку
  })
  
};

