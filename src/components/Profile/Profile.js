import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [edit, setEdit] = React.useState(true);
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();
  const { name, email } = values;

  function handleEdit() {
    setEdit(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    isValid && props.handleEditProfile({
      name: name,
      email: email,
    }, () => { resetForm() });

    setEdit(true)
  }

  function handleLogout() {
    props.logout({ email: currentUser.email })
  }

  return(
    <>
      <Header loggedIn={true} />
      <section className='profile'>
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        {props.isLoading
          ? <Preloader />

          : <form className='profile__form'
            noValidate
            action='URL'
            method='post'
            onSubmit={handleSubmit}
          >
            <div className='profile__container-input'>
              <label className='profile__label'>
                Имя
                <input
                  className='profile__input'
                  type='text'
                  name='name'
                  id='name'
                  required
                  minLength='2'
                  maxLength='30'
                  disabled={edit}
                  onChange={handleChange}
                  value={currentUser.name || name || ''}
                />
              </label>
              <span className='profile__input-error'>{errors.name}</span>
              <label className='profile__label'>
                E-mail
                <input
                  className='profile__input'
                  type='email'
                  name='email'
                  id='email'
                  required
                  disabled={edit}
                  onChange={handleChange}
                  value={currentUser.email || email || ''}
                />
              </label>
              <span className='profile__input-error'>{errors.email}</span>
            </div>
            {
              edit
                ? <ul className='profile__buttons'>
                    <button className='profile__edit-button' type='button' onClick={handleEdit}>Редактировать</button>
                    <button className='profile__signout-button' type='button' onClick={handleLogout}>Выйти из аккаунта</button>
                  </ul>

                : <button className={ isValid ? 'profile__submit-button' : 'profile__submit-button profile__submit-button_disabled'} disabled={!isValid} type='submit'>Сохранить</button>
            }
          </form>
        }
      </section>
    </>
  )
}