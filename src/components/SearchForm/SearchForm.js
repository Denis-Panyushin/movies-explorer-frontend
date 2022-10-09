import React from 'react';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const { name } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid && !props.isLoading &&
      props.getMoviesList(name);
    resetForm();
  }

  return(
    <section className='search-movies section-movies'>
      <div className='search-movies__container'>
        <form
          noValidate
          className='search-movies__form'
          onSubmit={handleSubmit}
        >
          <input
            className='search-movies__input'
            type='text'
            name='name'
            required
            placeholder='Фильм'
            maxLength='60'
            onChange={handleChange}
            value={name || ''}
          />
          <button
            className='search-movies__button'
            type='submit'
            disabled={!isValid}
          >
            Найти
          </button>
        </form>
        <span className='search__input-error'>{errors.name}</span>
        <FilterCheckbox handleToggleShortMovies={props.handleToggleShortMovies}/>
      </div>
    </section>
  )
}