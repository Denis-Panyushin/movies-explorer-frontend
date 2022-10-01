import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return(
    <footer className="footer">
      <h4 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
      <div className="footer__container">
        <p className="footer__copyright">© 2020</p>
        <ul className="footer__links">
          <li className="footer__container-link">
            <Link to={{ pathname: "https://practicum.yandex.ru/" }} className="footer__link">Яндекс.Практикум</Link>
          </li>
          <li className="footer__container-link">
            <Link to={{ pathname: "https://github.com/Denis-Panyushin" }} className="footer__link">Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
