import React from 'react';
import { useLocation } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './SearchForm.css';

export default function SearchForm(props) {
  const location = useLocation();
  const { values, handleChange, errors, isValid, setValues } = useFormWithValidation();
  const { name } = values;
  const localCheked = localStorage.getItem('isShort') === 'true'
  const [checked, setChecked] = React.useState(localCheked)

  function handleSubmit(e) {
    e.preventDefault();
    isValid && !props.isLoading &&
      props.getMoviesList(name, checked);
  }

  function onChange(event) {
    const isShortFilms = event.target.checked
    setChecked(isShortFilms)
    if (location.pathname === '/movies') {
      props.getMoviesList(props.defaultValue, !checked)
    } else if (location.pathname === '/saved-movies'){
      props.handleToggleShortMovies({checked: checked})
    }
  }

  React.useEffect(() => {
    if (location.pathname === '/movies') {
      setValues({ name: props.defaultValue })
      props.getMoviesList(props.defaultValue, checked)
    }
  }, [location])

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
            placeholder='Фильм'
            maxLength='60'
            onChange={handleChange}
            value={name || ''}
            autoComplete='off'
          />
          <button
            className='search-movies__button'
            type='submit'
            disabled={!isValid}
          >
            Найти
          </button>
        </form>
        <span className='search-movies__input-error'>{errors.name}</span>
        <div className='filter-ckeckbox'>
      <label className='filter-checkbox__label'>
        <input
          type='checkbox'
          className='filter-checkbox__input'
          name='filterCheckbox'
          checked={checked}
          onChange={(e) => onChange(e)}
        />
        <span className='filter-checkbox_visible'></span>
      </label>
      <p className='filter-checkbox__title'>Короткометражки</p>
    </div>
      </div>
    </section>
  )
}