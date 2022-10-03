import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import Navigation from '../Navigation/Navigation';
import './Header.css'

export default function Header(props) {
  return(
    <header className='header'>
      <div className='header__container'>
        <Link to='/' className='header__link'><img src={logo} alt='логотип' className='header__logo'/></Link>
        <Navigation loggedIn={props.loggedIn} />
      </div>
    </header>
  )
}
