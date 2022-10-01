import React from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { AppContext } from "../../contexts/AppContext";
import './Movies.css';
import Footer from "../Footer/Footer";

export default function Movies(props) {
  const moviesData = React.useContext(AppContext)

  return(
    <>
      <Header loggedIn={true} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList moviesData={moviesData} />
      </main>
      <Footer />
    </>
  )
}