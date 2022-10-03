import React from 'react';
import './AboutProject.css'

export default function AboutProject() {
  return(
    <section className='about-project section'>
      <h2 className='about-project__title section__title'>О проекте</h2>
      <div className='about-project__description-container'>
        <div className='about-project__description'>
          <h3 className='about-project__description-subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__description-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__description'>
          <h3 className='about-project__description-subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__description-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__timing-container'>
        <div className='about-project__timing'>
            <p className='about-project__timing-text about-project__timing-text_green'>1 неделя</p>
            <p className='about-project__timing-description'>Back-end</p>
          </div>
          <div className='about-project__timing'>
            <p className='about-project__timing-text about-project__timing-text_gray'>4 недели</p>
            <p className='about-project__timing-description'>Front-end</p>
          </div>
        </div>
    </section>
  )
}
