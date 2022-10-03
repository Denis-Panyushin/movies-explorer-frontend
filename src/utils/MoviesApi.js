const urlMovies = 'https://api.nomoreparties.co/beatfilm-movies';

const checkResponse = (response) => {
  if (response.ok) {
    return response.json()
  }
  return Promise.reject(`Ошибка ${response.status}`)
}

export const getMovies = () => {
  return fetch(`${urlMovies}`, {
    headers: {
      'Content-type': 'application/json'
    }
  }).then(checkResponse);
}