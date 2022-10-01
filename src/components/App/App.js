import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Login/Login.js';
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import * as movieApi from '../../utils/MoviesApi.js';
import { AppContext } from '../../contexts/AppContext.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFond from '../NotFound/NotFound.js';

function App() {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    movieApi.getMovies()
      .then((moviesData) => {
        setMovies(moviesData)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <AppContext.Provider value={movies}>
      <div className='background'>
        <div className='page'>
          <Switch>
            <Route exact path='/'>
              <Main/>
            </Route>
            <Route path='/signup'>
              <Register />
            </Route>
            <Route path='/signin'>
              <Login />
            </Route>
            <Route path='/profile'>
              <Profile />
            </Route>
            <Route path='/movies'>
              <Movies />
            </Route>
            <Route path='/saved-movies'>
              <SavedMovies />
            </Route>
            <Route path='*'>
              <NotFond />
            </Route>
          </Switch>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
