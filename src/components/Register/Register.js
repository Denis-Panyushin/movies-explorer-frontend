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
            pattern='^[а-яА-ЯёЁa-zA-Z]{2,30}$'
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
            pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
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