import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Login.css';

export default function Login(props) {
  return(
    <section className='login'>
      <Link to='/' className='login__link'><img src={logo} alt='логотип' className='login__logo'/></Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <form className='login__form'
        noValidate
        action='URL'
        method='post'
      >
        <label className='login__label'>
          E-mail
          <input
            className='login__input'
            type='text'
            name='email'
            id='email'
            required
          />
          <span className='login__input-error'>Что-то пошло не так...</span>
        </label>
        <label className='login__label'>
          Пароль
          <input
            className='login__input'
            type='password'
            name='password'
            id='password'
            required
          />
          <span className='login__input-error'>Что-то пошло не так...</span>
        </label>
        <button className='login__submit-button' type='submit'>Войти</button>
      </form>
      <div className='login__signup'>
        <p className='login__signup-text'>Еще не зарегестрированы? <Link to='/signup' className='login__signup-link'>Регистрация</Link></p>
      </div>
    </section>
  )
}