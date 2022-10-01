import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';
import useWindowSize from "../../hooks/useWindowSize";

export default function MoviesCardList(props) {
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
                  props.moviesData
                  //Хардкод для 3 этапа
                    .map((movie) => (
                      <MoviesCard
                        key={movie.id}
                        movie={movie}
                        savedMovies={props.savedMovies}
                      />
                    ))
                }
              </section>

          : <>
              <section className='movies-cardlist'>
                {
                  props.moviesData.length > count &&
                    props.moviesData
                      .slice(0, count)
                      .map((movie) => (
                        <MoviesCard
                          key={movie.id}
                          movie={movie}
                        />
                      ))
                }
              </section>
              <div className='movies-cardlist__more-button-container'>
                <button
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