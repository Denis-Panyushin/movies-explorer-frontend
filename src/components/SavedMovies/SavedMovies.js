import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { AppContext } from '../../contexts/AppContext';
import Footer from '../Footer/Footer';

export default function SavedMovies(props) {
  const value = React.useContext(AppContext)

  return(
    <>
      <Header loggedIn={true} />
      <main className='saved-movies main'>
        <SearchForm
          isLoading={props.isLoading}
          getMoviesList={props.getMoviesList}
          handleToggleShortMovies={props.handleToggleShortSavedMovies}
        />
        {value.savedMovies &&
        <MoviesCardList
          savedMovies={true}
          handleDeleteMovie={props.handleDeleteSavedMovie}
          checkLikeStatus={props.checkLikeStatus}
        />
        }
      </main>
      <Footer />
    </>
  )
}