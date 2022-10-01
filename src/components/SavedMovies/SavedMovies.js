import React from 'react';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { AppContext } from '../../contexts/AppContext';
import Footer from '../Footer/Footer';

export default function SavedMovies(props) {
  //Хардкод для 3 этапа
  const moviesData = React.useContext(AppContext)

  return(
    <>
      <Header loggedIn={true} />
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList savedMovies={true} moviesData={moviesData} />
      </main>
      <Footer />
    </>
  )
}