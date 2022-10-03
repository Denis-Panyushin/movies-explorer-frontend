import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className='filter-ckeckbox'>
      <label className='filter-checkbox__label'>
        <input
          type='checkbox'
          className='filter-checkbox__input'
          name='filterCheckbox'
        />
        <span className='filter-checkbox_visible'></span>
      </label>
      <p className='filter-checkbox__title'>Короткометражки</p>
    </div>
  )
}