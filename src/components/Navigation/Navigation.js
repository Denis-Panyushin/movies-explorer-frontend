import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import profileIcon from '../../images/profile-icon.svg';
import useWindowSize from '../../hooks/useWindowSize';
import iconBurger from '../../images/icon-burger.svg';
import iconClose from '../../images/icon-close.svg'

export default function Navigation(props) {
  const size = useWindowSize();
  const [burgerMenu, setBurgerMenu ] = React.useState(false)
  const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false)

  function handleOpenBurgerMenu() {
    setOpenBurgerMenu(true)
  }

  function handleCloseBurgerMenu() {
    setOpenBurgerMenu(false)
  }


  React.useEffect(() => {
    function getSize() {
      if (size >= 1024) {
        setBurgerMenu(false)
      } else {
        setBurgerMenu(true)
      }
    }
    getSize();
  }, [size]);

  return(
    <nav className='navigation'>
      {
        props.loggedIn
          ?<>{burgerMenu
                ? <>
                    <button type='button' className='navigation__button' onClick={handleOpenBurgerMenu} ><img src={iconBurger} alt='Кнопка открытия бокового меню'/></button>
                    <div className={`navigation__menu ${openBurgerMenu && `navigation__menu_opened`}`}>
                      <nav className='navigation__links'>
                      <button type='button' className='navigation__close-button' onClick={handleCloseBurgerMenu}><img src={iconClose} alt='Кнопка закрытия боковго меню'/></button>
                      <div className='navigation__container-links'>
                        <NavLink
                            exact
                            to='/'
                            activeClassName='navigation__link_active'
                            className='navigation__link navigation__link_auth navigation__link-main'
                          >
                            Главная
                          </NavLink>
                          <NavLink
                            to='/movies'
                            activeClassName='navigation__link_active'
                            className='navigation__link navigation__link_auth navigation__link-movies'
                          >
                            Фильмы
                          </NavLink>
                          <NavLink
                            to='/saved-movies'
                            activeClassName='navigation__link_active'
                            className='navigation__link navigation__link_auth navigation__link-saved-movies'
                          >
                            Сохраненные фильмы
                          </NavLink>
                        </div>
                        <NavLink
                          to='/profile'
                          activeClassName='navigation__link_active'
                          className='navigation__link navigation__link_auth navigation__link-profile'
                        >
                          Аккаунт<img className='navigation__icon-profile' src={profileIcon} alt='Иконка профиля'/>
                        </NavLink>
                      </nav>
                    </div>
                  </>
                : <nav className='navigation__links'>
                  <NavLink
                    to='/movies'
                    activeClassName='navigation__link_active'
                    className='navigation__link navigation__link_auth navigation__link-movies'
                  >
                    Фильмы
                  </NavLink>
                  <NavLink
                    to='/saved-movies'
                    activeClassName='navigation__link_active'
                    className='navigation__link navigation__link_auth navigation__link-saved-movies'
                  >
                    Сохраненные фильмы
                  </NavLink>
                  <NavLink
                    to='/profile'
                    activeClassName='navigation__link_active'
                    className='navigation__link navigation__link_auth navigation__link-profile'
                  >
                    Аккаунт<img className='navigation__icon-profile' src={profileIcon} alt='Иконка профиля'/>
                  </NavLink>
                </nav>
              }
            </>

          : <nav className='navigation__links-main'>
              <NavLink
                to='/signup'
                className='navigation__link navigation__link_no-auth navigation__links_signup'
              >
                Регистрация
              </NavLink>
              <NavLink
                to='/signin'
                className='navigation__link navigation__link_no-auth navigation__link_signin'
              >
                Войти
              </NavLink>
            </nav>
      }
    </nav>
  )
}
