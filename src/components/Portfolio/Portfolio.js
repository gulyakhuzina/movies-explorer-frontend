import React from 'react';
import "./Portfolio.css"
import arrowSites from '../../images/arrow-sites.svg';

function Portfolio(props) {
  return (
    <section className="portfolio wrapper">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__sites">
        <li className="portfolio__site">
          <a href="https://gulyakhuzina.github.io/how-to-learn/index.html" target="_blank" className="portfolio__link" rel="noopener noreferrer">
            <p className="portfolio__text">Статичный сайт</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </a>
        </li>
        <li className="portfolio__site">
          <a href="https://gulyakhuzina.github.io/russian-travel/index.html" target="_blank" className="portfolio__link" rel="noopener noreferrer">
            <p className="portfolio__text">Адаптивный сайт</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </a>
        </li>
        <li className="portfolio__site">
          <a href="https://mesto.khuzinagulya.nomoredomains.monster" target="_blank" className="portfolio__link" rel="noopener noreferrer">
            <p className="portfolio__text">Одностраничное приложение</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;