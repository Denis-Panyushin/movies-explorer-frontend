import React from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
import Login from '../Login/Login.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import * as movieApi from '../../utils/MoviesApi.js';
import * as mainApi from '../../utils/MainApi.js';
import { AppContext } from '../../contexts/AppContext.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFond from '../NotFound/NotFound.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import InfoPopup from '../InfoPopup/InfoPopup.js';

function App() {
  const location = useLocation();
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShortMovies, setIsShortMovies] = React.useState(undefined);
  const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoPopupTitle, setInfoPopupTitle] = React.useState({ title: 'Что-то пошло не так! Попробуйте ещё раз.' });
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() =>{
    if(loggedIn === true) {
      setIsLoading(true)
        mainApi.getUserInfo()
          .then((data) => {
            setCurrentUser(data)
          })
          .catch(err => console.log(err))
          .finally(() => {
            setIsLoading(false)
          })
      }
  }, [location, loggedIn]);

  React.useEffect(() => {
      if(loggedIn === true) {
        setIsLoading(true)
        mainApi.getUserMovies()
          .then((data) => {
            const lastSearchList = JSON.parse(localStorage.getItem('lastSearchList'));
            lastSearchList && setMovies(lastSearchList);
            setSavedMovies(data);
            localStorage.setItem(
              'savedMoviesList',
              JSON.stringify(data)
            );
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsLoading(false)
          })
      }
  }, [location, loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if(localStorage.getItem('token')){
      mainApi.checkToken(token)
        .then((data) => {
          setLoggedIn(true)
          history.push(location.pathname)
        })
        .catch(err => console.log(err))
    }
  }, [localStorage.getItem('token')])

  function handleRegister({ name, email, password }) {
    mainApi.register(name, email, password)
    .then((res) => {
      console.log(res)
      history.push('/signin')
    })
    .catch((err) => {
      console.log(err)
      openErrorPopup('Что-то пошло не так! Попробуйте ещё раз.');
    })
  };

  function handleLogin({ email, password}) {
    mainApi.login(email, password)
    .then((res) => {
      history.push('/movies')
      setLoggedIn(true)
    })
    .catch((err) => {
      console.log(err)
      openErrorPopup('Что-то пошло не так! Попробуйте ещё раз.');
    })
  };

  function handleEditProfile({ name, email }) {
    mainApi.setUserInfo(name, email)
    .then((res) => {
      setCurrentUser({...currentUser, name: res.name, email: res.email})
      openSuccessPopup('Данные успешно обновлены!');
    })
    .catch((err) => {
      openErrorPopup('Что-то пошло не так! Попробуйте ещё раз.');
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  function handleInfoPopupClick() {
    setIsInfoPopupOpen(true);
  };

  function openErrorPopup(title) {
    handleInfoPopupClick();
    setIsError(true);
    setInfoPopupTitle({ title });
  };

  function openSuccessPopup(title) {
    handleInfoPopupClick();
    setIsError(false);
    setInfoPopupTitle({ title });
  };

  function closeInfoPopup() {
    setIsInfoPopupOpen(false);
  };

  React.useEffect(() => {
    function handleEscClose(evt) {
      evt.key === 'Escape' && closeInfoPopup();
    }

    function handleOverlayClose(evt) {
      evt.target.classList.contains('popup-info_opened') && closeInfoPopup();
    }

    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('click', handleOverlayClose);

    return () => {
      window.removeEventListener('click', handleOverlayClose);
      window.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  function checkLikeStatus({ movie }) {
    if (savedMovies) {
      return savedMovies.some(
        (i) => i.movieId === movie.id && i.owner === currentUser._id
      );
    }
    return false;
  };

  function searchMovies(name) {
    const MoviesList = JSON.parse(localStorage.getItem('movies'));
    const lastSearchList = MoviesList.filter((movie) => {
      const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
      return (
        movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        movie.description.toLowerCase().includes(name.toLowerCase()) ||
        nameEN.toLowerCase().includes(name.toLowerCase())
      );
    });
    setMovies(lastSearchList);
    localStorage.setItem('lastSearchList', JSON.stringify(lastSearchList));
    lastSearchList.length === 0 && openErrorPopup('Ничего не найдено');
    return lastSearchList;
  };

  function getMovieslist(name, isShort) {
    if (loggedIn) {
      setIsLoading(true);
      movieApi.getMovies()
        .then((moviesData) => {
          localStorage.setItem('movies', JSON.stringify(moviesData));
          const searchedMovies = moviesData.filter((movie) => {
            const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
            return (movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
            movie.description.toLowerCase().includes(name.toLowerCase()) ||
            nameEN.toLowerCase().includes(name.toLowerCase()))
          })
          const foundMovies = isShort ? searchedMovies.filter((item) => item.duration <= 40) : searchedMovies
          localStorage.setItem('foundMovies', JSON.stringify(foundMovies))
          const lastSearchList = ('lastSearchList', JSON.parse(localStorage.getItem('foundMovies')))
          localStorage.setItem('nameMovie', name)
          localStorage.setItem('isShort', isShort)
          setMovies(lastSearchList)
          foundMovies.length === 0 && openErrorPopup('Ничего не найдено');
        })
        .catch((err) => {
          openErrorPopup('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  function searchSavedMovies(name) {
    const savedMoviesList = JSON.parse(localStorage.getItem('savedMoviesList'));
    if (!name) {
      openErrorPopup('Нужно ввести ключевое слово');
      return;
    }
    if (savedMoviesList) {
      const searchSavedMoviesList = savedMoviesList.filter((movie) => {
        const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
        return (
          movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          movie.description.toLowerCase().includes(name.toLowerCase()) ||
          nameEN.toLowerCase().includes(name.toLowerCase())
        );
      });
      setSavedMovies(searchSavedMoviesList);
    }
  };

  function handleSavedMovie({ movie }) {
    const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
    const country = movie.country ? movie.country : 'Неизвестно';
    console.log(country)
    mainApi.createMovie({
        country: country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: nameEN,
      })
      .then((res) => {
        const NewSavedMovies = [res.movie, ...savedMovies];
        setSavedMovies(NewSavedMovies);
        localStorage.setItem('savedMoviesList', JSON.stringify(NewSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleDeleteMovie({ movie }) {
    const movieForDelete = savedMovies.find((i) => i.movieId === movie.id);
    mainApi.deleteMovie(movieForDelete._id).then((res) => {
        const NewSavedMovies = savedMovies.filter(
          (i) => i.movieId !== movie.id
        );
        setSavedMovies(NewSavedMovies);
        localStorage.setItem('savedMoviesList', JSON.stringify(NewSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleDeleteSavedMovie({ movie }) {
    mainApi.deleteMovie(movie._id)
      .then((res) => {
        const NewSavedMovies = savedMovies.filter((i) => i._id !== movie._id);
        setSavedMovies(NewSavedMovies);
        localStorage.setItem('savedMoviesList', JSON.stringify(NewSavedMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleToggleShortSavedMovies({ checked }) {
    !checked
      ? setIsShortSavedMovies(true)
      : setIsShortSavedMovies(false);
  };

  React.useEffect(() => {
    const savedMoviesList = JSON.parse(localStorage.getItem('savedMoviesList'));
    isShortSavedMovies
      ? setSavedMovies((state) =>
          state.filter((i) => i.duration <= 40)
        )
      : setSavedMovies(savedMoviesList);
  }, [isShortSavedMovies]);

  function handleLogout({ email }) {
    setIsLoading(true)
    mainApi.logout(email)
      .then(() => {
        localStorage.clear();
        setCurrentUser({ name: '', email: '' });
        setMovies([]);
        setSavedMovies([]);
        setLoggedIn(false);
        history.push('/');
        console.log(loggedIn)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value={{
        movies: movies,
        savedMovies: savedMovies,
        loggedIn: loggedIn,
        isLoading: isLoading
      }}>
        <div className='background'>
          <div className='page'>
            <Switch>
              <Route exact path='/'>
                <Main/>
              </Route>
              <Route path='/signup'>
                <Register handleRegister={handleRegister} />
              </Route>
              <Route path='/signin'>
                <Login handleLogin={handleLogin} />
              </Route>
              <ProtectedRoute
                path='/profile'
                component={Profile}
                handleEditProfile={handleEditProfile}
                logout={handleLogout}
                isLoading={isLoading}
              />
              <ProtectedRoute
                path='/movies'
                defaultValue={localStorage.getItem('nameMovie') || ''}
                component={Movies}
                getMoviesList={getMovieslist}
                handleSavedMovie={handleSavedMovie}
                handleDeleteMovie={handleDeleteMovie}
                checkLikeStatus={checkLikeStatus}
                isLoading={isLoading}
              />
              <ProtectedRoute
                path='/saved-movies'
                component={SavedMovies}
                getMoviesList={searchSavedMovies}
                handleDeleteSavedMovie={handleDeleteSavedMovie}
                checkLikeStatus={checkLikeStatus}
                handleToggleShortSavedMovies={handleToggleShortSavedMovies}
                isLoading={isLoading}
              />
              <Route path='*'>
                <NotFond />
              </Route>
            </Switch>
            <InfoPopup
              isOpen={isInfoPopupOpen}
              onClose={closeInfoPopup}
              title={infoPopupTitle.title}
              isError={isError}
            />
          </div>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
