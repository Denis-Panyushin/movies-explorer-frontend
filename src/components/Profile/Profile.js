import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

export default function Profile() {
  const [edit, setEdit] = React.useState(true);

  function handleEdit() {
    setEdit(false);
  }

  return(
    <>
      <Header loggedIn={true} />
      <section className='profile'>
        <h2 className='profile__title'>Привет, Денис!</h2>
        <form className='profile__form'
          noValidate
          action='URL'
          method='post'
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
                disabled={edit}
                value='Денис'
              />
            </label>
            <label className='profile__label'>
              E-mail
              <input
                className='profile__input'
                type='text'
                name='email'
                id='email'
                required
                disabled={edit}
                value='panyushin.d@yandex.ru'
              />
            </label>
          </div>
          {
            edit
              ? <ul className='profile__buttons'>
                  <button className='profile__edit-button' type='button' onClick={handleEdit}>Редактировать</button>
                  <button className='profile__signout-button' type='button'>Выйти из аккаунта</button>
                </ul>

              : <button className='profile__submit-button' type='submit'>Сохранить</button>
          }
        </form>
      </section>
    </>
  )
}