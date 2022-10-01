import React from "react";
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Register.css';

export default function Register(props) {
  return(
    <section className="register">
      <Link to='/' className="register__link"><img src={logo} alt="логотип" className="register__logo"/></Link>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form"
        noValidate
        action='URL'
        method='post'
      >
        <label className="register__label">
          Имя
          <input
            className="register__input"
            type="text"
            name="name"
            id="name"
            required
          />
          <span className="register__input-error">Что-то пошло не так...</span>
        </label>
        <label className="register__label">
          E-mail
          <input
            className="register__input"
            type="text"
            name="email"
            id="email"
            required
          />
          <span className="register__input-error">Что-то пошло не так...</span>
        </label>
        <label className="register__label">
          Пароль
          <input
            className="register__input"
            type="password"
            name="password"
            id="password"
            required
          />
          <span className="register__input-error">Что-то пошло не так...</span>
        </label>
        <button className="register__submit-button" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы? <Link to='/signin' className="register__signin-link">Войти</Link></p>
      </div>
    </section>
  )
}