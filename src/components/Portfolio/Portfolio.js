import React from 'react';
import "./Portfolio.css"
import arrowSites from '../../images/arrow-sites.svg';

function Portfolio(props) {
  return (
    <section className="portfolio">
        <h3 className="portfolio__title">Портфолио</h3>
        <ul className="portfolio__sites">
          <li className="portfolio__site">
            <p className="portfolio__text">Статичный сайт</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </li>
          <li className="portfolio__site">
            <p className="portfolio__text">Адаптивный сайт</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </li>
          <li className="portfolio__site">
            <p className="portfolio__text">Одностраничное приложение</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </li>
        </ul>
      </section>
  )
}

export default Portfolio;