import React from "react";
import './Main.css';
import Header from '../Header/Header.js';
import Promo from '../Promo/Promo.js';
import AboutProject from "../AboutProject/AboutProject";

export default function Main() {
  return(
    <>
      <Header />
      <main className="landing-content">
        <Promo />
        <AboutProject />
      </main>
    </>
  )
}
