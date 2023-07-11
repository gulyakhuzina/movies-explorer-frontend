import React from 'react';
import './Main.css';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main(props) {
  return (
    <>
      <Header
        onClick={props.onClick}
        loggedIn={props.loggedIn}
      />
      <main className="content page__content">
        <Promo
          scrollTo={props.scrollTo}
        />
        <AboutProject
          myRef={props.myRef}
        />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main; 