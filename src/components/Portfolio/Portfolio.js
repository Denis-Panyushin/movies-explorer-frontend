import React from "react";
import { Link } from "react-router-dom";
import './Portfolio.css';

export default function Portfolio() {
  return(
    <section className="portfolio section">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="protfolio__container-link">
          <Link to={{ pathname: "https://denis-panyushin.github.io/how-to-learn/" }} target='_blank' rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-text">↗</p>
          </Link>
        </li>
        <li className="protfolio__container-link">
          <Link to={{ pathname: "https://denis-panyushin.github.io/russian-to-travel/" }} target='_blank' rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-text">↗</p>
          </Link>
        </li>
        <li className="protfolio__container-link">
          <Link to={{ pathname: "https://projectmestofrontendpanyushin.nomoredomains.sbs/" }} target='_blank' rel="noreferrer" className="portfolio__link">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-text">↗</p>
          </Link>
        </li>
      </ul>
    </section>
  )
}
