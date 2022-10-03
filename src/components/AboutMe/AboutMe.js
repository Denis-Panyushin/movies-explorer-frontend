import React from 'react';
import './AboutMe.css';
import avatar from '../../images/avatar.jpg'

export default function AboutMe() {
  return(
    <section className='about-me section'>
      <h2 className='about-me__title section__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__container-info'>
          <h3 className='about-me__name'>Денис</h3>
          <p className='about-me__description'>Фронтенд-разработчик, 21 год</p>
          <p className='about-me__text'>Живу в Московской области в городе Балашиха. Закончил колледж по специальности автомеханика. Люблю автомобили, увлекаюсь автоспортом. Пошел учиться на веб-разработчика, прошел вводный этап на Яндекс.Практикуме, и понял, что меня интересует данная область, так как мне нравится создавать что-то собственными руками. После получения диплома хочу попробовать себя в роли джуниор-разработчика и работать над большими проектами.</p>
          <p className='about-me__platform'>Github</p>
        </div>
        <img src={avatar} alt='автар' className='about-me__avatar' />
      </div>
    </section>
  )
}
