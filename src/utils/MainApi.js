const urlMain = 'https://api.moviesdiplompanu.nomorepartiesxyz.ru';
const token = localStorage.getItem('token');

const checkResponse = (response) => {
  if (response.ok) {
    return response.json()
  }
  return Promise.reject(`Ошибка ${response.status}`)
};

export const register = (name, email, password) => {
  return fetch(`${urlMain}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    })
  })
  .then((res) => {
    return res;
  })
  .then((res) => checkResponse(res))
};

export const login = (email, password) => {
  return fetch(`${urlMain}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then((res) => checkResponse(res))
  .then((data) => {
    if(data) {
      localStorage.setItem('token', data.token);
      return data;
    } else {
      return;
    }
  })
};

export const logout = (email) => {
  return fetch(`${urlMain}/signout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email
    })
  })
  .then(data => data)
  .then((res) => checkResponse(res))
};

export const getUserInfo = () => {
  return fetch(`${urlMain}/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    }
  })
  .then((res) => checkResponse(res))
};

export const setUserInfo = (name, email) => {
  return fetch(`${urlMain}/users/me`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
  .then((res) => checkResponse(res))
};

export const getUserMovies = () => {
  return fetch(`${urlMain}/movies`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    }
  })
  .then((res) => checkResponse(res))
};

export const createMovie = ({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  }) => {
  return fetch(`${urlMain}/movies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: image,
      trailerLink: trailerLink,
      thumbnail: thumbnail,
      movieId: movieId,
      nameRU: nameRU,
      nameEN: nameEN,
    })
  })
  .then((res) => checkResponse(res))
};

export const deleteMovie = (movieId) => {
  return fetch(`${urlMain}/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => checkResponse(res))
};

