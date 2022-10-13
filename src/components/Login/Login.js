import React from 'react';
import { Link } from 'react-router-dom';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import logo from '../../images/logo.svg';
import './Login.css';

export default function Login(props) {
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const { email, password } = values;

  function handleSubmit(e) {
    e.preventDefault();

    isValid && props.handleLogin({
      email: email,
      password: password
    }, () => { resetForm() });
  }

  return(
    <section className='login'>
      <Link to='/' className='login__link'><img src={logo} alt='логотип' className='login__logo'/></Link>
      <h2 className='login__title'>Рады видеть!</h2>
      <form className='login__form'
        noValidate
        action='URL'
        method='post'
        onSubmit={handleSubmit}
      >
        <label className='login__label'>
          E-mail
          <input
            className='login__input'
            type='email'
            name='email'
            id='email'
            required
            pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
            onChange={handleChange}
            value={email || ''}
          />
          <span className='login__input-error'>{errors.email}</span>
        </label>
        <label className='login__label'>
          Пароль
          <input
            className='login__input'
            type='password'
            name='password'
            id='password'
            required
            onChange={handleChange}
            value={password || ''}
          />
          <span className='login__input-error'>{errors.password}</span>
        </label>
        <button className={ isValid ? 'login__submit-button' : 'login__submit-button login__submit-button_disabled'} disabled={!isValid} type='submit'>Войти</button>
      </form>
      <div className='login__signup'>
        <p className='login__signup-text'>Еще не зарегестрированы? <Link to='/signup' className='login__signup-link'>Регистрация</Link></p>
      </div>
    </section>
  )
}