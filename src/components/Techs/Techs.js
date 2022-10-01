import React from "react";
import './Techs.css';

export default function Techs() {
  return(
    <section className="techs section">
      <h2 className="techs__title section__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__container-subtitle">7 технологий</h3>
        <p className="techs__container-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__skills">
          <li className="techs__skill">
            <p className="techs__skill-text">HTML</p>
          </li>
          <li className="techs__skill">
            <p className="techs__skill-text">CSS</p>
          </li>
          <li className="techs__skill">
            <p className="techs__skill-text">JS</p>
          </li>
          <li className="techs__skill">
            <p className="techs__skill-text">React</p>
          </li>
          <li className="techs__skill">
            <p className="techs__skill-text">Git</p>
          </li>
          <li className="techs__skill">
            <p className="techs__skill-text">Express.js</p>
          </li>
          <li className="techs__skill">
            <p className="techs__skill-text">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  )
}
