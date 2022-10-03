import React from 'react';
import landingLogo from '../../images/landing-logo.png'
import './Promo.css';

export default function Promo() {
  return(
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <img src={landingLogo} alt='Лого лендинга' className='promo__landing-logo' />
    </section>
  )
}
