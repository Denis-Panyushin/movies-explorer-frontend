import React from 'react';
import './InfoPopup.css';
import errorUnion from '../../images/union-error.svg';
import successUnion from '../../images/union-success.svg';

export default function InfoPopup(props) {
  return (
    <section className={`popup-info ${props.isOpen ? 'popup-info_opened' : ''}`}>
      <div className={`popup-info__container ${props.isError ? 'popup-info__container_type_error' : ''}`}>
        <button
          type='button'
          className='popup-info__close'
          onClick={props.onClose}
        ></button>
        <img alt='Юнион' src={props.isError ? errorUnion : successUnion} className='popup-info__union' />
        <h2 className='popup-info__title'>{props.title}</h2>
      </div>
    </section>
  );
}