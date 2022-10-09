import React from 'react';
import './MoviesCard.css';
import iconLikeButton from '../../images/like-button-active.svg';
import iconDeleteButton from '../../images/delete-button.svg'

export default function MoviesCard(props) {

  function converterDuration (data) {
    const hours = Math.floor(data / 60);
    const minutes = data % 60;
    return `${hours ? hours + 'ч' : ''} ${minutes}м`;
  };

  const isLiked = props.checkLikeStatus({ movie: props.movie });

  function handleSavedMovie () {
    props.handleSavedMovie({ movie: props.movie })
  }

  function handleDeleteMovie () {
    props.handleDeleteMovie({ movie: props.movie })
  }

  return (
    <div className='movie'>
      <div className='movie__image-container'>
        <a className='movie__trailer-link' href={props.movie.trailerLink} target='_blank' rel='noopener noreferrer'>
          <img className='movie__image' alt={`Постер к фильму ${props.movie.nameRU}`} src={props.savedMovies ? `${props.movie.image}` : `https://api.nomoreparties.co/${props.movie.image.url}`} />
        </a>
        {
          props.savedMovies
          ? <button type='button' className='movie__button-delete'><img src={iconDeleteButton} alt='Иконка кнопки удалить' className='movie__icon-button-delete' onClick={handleDeleteMovie}/></button>
          : isLiked ? <button type='button' className='movie__button-like movie__button-like_active' onClick={handleDeleteMovie}><img src={iconLikeButton} alt='Иконка активного лайка' className='movie__icon-button-like-active' /></button> : <button className='movie__button-like' onClick={handleSavedMovie}>Сохранить</button>
        }
      </div>
      <div className='movie__description'>
        <h3 className='movie__name'>{props.movie.nameRU}</h3>
        <p className='movie__duration'>{converterDuration(props.movie.duration)}</p>
      </div>
    </div>
  )
}