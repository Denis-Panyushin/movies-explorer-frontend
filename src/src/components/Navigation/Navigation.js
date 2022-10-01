import React from "react";
import { Link } from "react-router-dom";
import './Navigation.css'

export default function Navigation(props) {
  return(
    <nav className="navigation">
      {props.loggedIn === false
        ? <div className="navigation__links">
            <Link className='navigation__link'>Регистрация</Link>
            <Link className="navigation__link navigation__link_enter">Вход</Link>
          </div>
        : <p className='text'>Фильмы</p>
      }
    </nav>
  )
}