import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { AppContext } from '../../contexts/AppContext';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

export default function Movies(props) {
  const value = React.useContext(AppContext)

  return(
    <>
      <Header loggedIn={true} />
      <main className='movies main'>
        <SearchForm
          isLoading={props.isLoading}
          getMoviesList={props.getMoviesList}
          handleToggleShortMovies={props.handleToggleShortMovies}
          defaultValue={props.defaultValue}
        />
        {props.isLoading && <Preloader />}
        {value.movies &&
          <MoviesCardList
            handleSavedMovie={props.handleSavedMovie}
            handleDeleteMovie={props.handleDeleteMovie}
            checkLikeStatus={props.checkLikeStatus}
          />
        }
      </main>
      <Footer />
    </>
  )
}