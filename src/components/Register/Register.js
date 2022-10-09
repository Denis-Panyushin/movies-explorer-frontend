import React from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import logo from '../../images/logo.svg';
import './Register.css';

export default function Register(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const { name, email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();

    isValid && props.handleRegister({
      name: name,
      email: email,
      password: password
    }, () => { resetForm() });
  }

  return(
    <section className='register'>
      <Link to='/' className='register__link'><img src={logo} alt='логотип' className='register__logo'/></Link>
      <h2 className='register__title'>Добро пожаловать!</h2>
      <form className='register__form'
        noValidate
        action='URL'
        method='post'
        onSubmit={handleSubmit}
      >
        <label className='register__label'>
          Имя
          <input
            className='register__input'
            type='text'
            name='name'
            id='name'
            required
            pattern='^[A-Za-z -]+$'
            minLength='2'
            maxLength='30'
            onChange={handleChange}
            value={name || ''}
          />
          <span className='register__input-error'>{errors.name}</span>
        </label>
        <label className='register__label'>
          E-mail
          <input
            className='register__input'
            type='email'
            name='email'
            id='email'
            required
            pattern='/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i'
            onChange={handleChange}
            value={email || ''}
          />
          <span className='register__input-error'>{errors.email}</span>
        </label>
        <label className='register__label'>
          Пароль
          <input
            className='register__input'
            type='password'
            name='password'
            id='password'
            required
            minLength='8'
            onChange={handleChange}
            value={password || ''}
          />
          <span className='register__input-error'>{errors.password}</span>
        </label>
        <button className={ isValid ? 'register__submit-button' : 'register__submit-button register__submit-button_disabled'} disabled={!isValid} type='submit'>Зарегистрироваться</button>
      </form>
      <div className='register__signin'>
        <p className='register__signin-text'>Уже зарегистрированы? <Link to='/signin' className='register__signin-link'>Войти</Link></p>
      </div>
    </section>
  )
}