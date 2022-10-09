import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import useWindowSize from '../../hooks/useWindowSize';
import { AppContext } from '../../contexts/AppContext';

export default function MoviesCardList(props) {
  const value = React.useContext(AppContext);
  const size = useWindowSize();
  const [count, setCount] = React.useState(0);
  const [cards, setCards] = React.useState(0);

  function increment() {
    setCount(count + cards);
  }

  React.useEffect(() => {
    function getSize() {
      if (size >= 1280) {
        setCount(12);
        setCards(3);
      }
      if (size < 1280 && size > 767) {
        setCount(8);
        setCards(2);
      }
      if (size <= 767) {
        setCount(5);
        setCards(2);
      }
    }
    getSize();
  }, [size]);


  return(
    <section className='movies section-movies'>
        {
          props.savedMovies
            ? <section className='movies-cardlist'>
                {
                  value.savedMovies
                    .map((movie) => (
                      <MoviesCard
                        key={movie.movieId}
                        movie={movie}
                        savedMovies={props.savedMovies}
                        handleDeleteMovie={props.handleDeleteMovie}
                        checkLikeStatus={props.checkLikeStatus}
                      />
                    ))
                }
              </section>

          : <>
              <section className='movies-cardlist'>
                {
                  value.movies.length > count &&
                    value.movies
                      .slice(0, count)
                      .map((movie) => (
                        <MoviesCard
                          key={movie.id}
                          movie={movie}
                          handleSavedMovie={props.handleSavedMovie}
                          handleDeleteMovie={props.handleDeleteMovie}
                          checkLikeStatus={props.checkLikeStatus}
                        />
                      ))
                }
                {value.movies.length <= count &&
                  value.movies.map((movie) => (
                    <MoviesCard
                      key={movie.id}
                      movie={movie}
                      handleSavedMovie={props.handleSavedMovie}
                      handleDeleteMovie={props.handleDeleteMovie}
                      checkLikeStatus={props.checkLikeStatus}
                    />
              ))}
              </section>
              <div
                className={ value.movies.length <= count  ? 'movies-cardlist__more-button-container_none' : 'movies-cardlist__more-button-container' }>
                <button
                  type='button'
                  className='movies-cardlist__more-button'
                  aria-label='Показать еще'
                  onClick={increment}
                >
                  Ещё
                </button>
              </div>
          </>
        }
  </section>
);
}