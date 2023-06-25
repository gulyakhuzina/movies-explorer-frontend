import React from 'react';
import { HashLink } from 'react-router-hash-link';
import "./Promo.css"
import logoLanding from '../../images/landing-logo.svg';

function Promo(props) {
  return (
    <section className="hero">
      <div className="hero__text">
        <h1 className="hero__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="hero__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <HashLink to="#aboutProject">
          <button className="hero__button" type="button">Узнать больше</button>
        </HashLink>
      </div>
      <img className="hero__logo" src={logoLanding} alt="Логотип" />
    </section>
  )
}

export default Promo;