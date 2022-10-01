import React from "react";
import logo from "../../images/logo.svg"
import Navigation from "../Navigation/Navigation";
import './Header.css'

export default function Header() {
  return(
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo"/>
      <Navigation loggedIn={false} />
    </header>
  )
}