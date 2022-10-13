import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from '../Preloader/Preloader';

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [edit, setEdit] = React.useState(true);
  const { values, handleChange, resetForm, errors, isValid, setValues } = useFormWithValidation();
  const { name, email } = values;
  const lastName = currentUser.name
  const lastEmail = currentUser.email
  const [disabled, setDisabled] = React.useState(true);

  function handleEdit() {
    setEdit(false);
  }


  React.useEffect(() => {
    if(name !== lastName || email !== lastEmail) {
      setDisabled(false)
    } else (
      setDisabled(true)
    )
    console.log(name)
    console.log(currentUser.name)
  }, [name, email])

  React.useEffect(() => {
    setValues({name: currentUser.name, email: currentUser.email})
  }, [currentUser])

  function handleSubmit(e) {
    e.preventDefault();

    isValid && props.handleEditProfile({
      name: name,
      email: email,
    }, () => { resetForm() });
    setEdit(true);
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
                  value={name || ''}
                  pattern='^[а-яА-ЯёЁa-zA-Z]{2,30}$'
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
                  pattern='^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$'
                  disabled={edit}
                  onChange={handleChange}
                  value={email || ''}
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

                : <button className={ isValid && !disabled ? 'profile__submit-button' : 'profile__submit-button profile__submit-button_disabled'} disabled={!isValid || disabled} type='submit'>Сохранить</button>
            }
          </form>
        }
      </section>
    </>
  )
}