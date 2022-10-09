import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox(props) {
  const [isChecked, setChecked] = React.useState(false);
  function onChange(event) {
    setChecked(event.target.checked);
    props.handleToggleShortMovies();
  }

  return (
    <div className='filter-ckeckbox'>
      <label className='filter-checkbox__label'>
        <input
          type='checkbox'
          className='filter-checkbox__input'
          name='filterCheckbox'
          checked={isChecked}
          onChange={(e) => onChange(e)}
        />
        <span className='filter-checkbox_visible'></span>
      </label>
      <p className='filter-checkbox__title'>Короткометражки</p>
    </div>
  )
}