import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  return(
    <section className='search-movies section-movies'>
      <div className='search-movies__container'>
        <form noValidate className='search-movies__form'>
          <input
            className='search-movies__input'
            type='text'
            required
            placeholder='Фильм'
          />
          <button
            className='search-movies__button'
            type='submit'
          >Найти
          </button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  )
}