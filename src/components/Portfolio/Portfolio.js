import React from 'react';
import "./Portfolio.css"
import arrowSites from '../../images/arrow-sites.svg';
import { Link } from 'react-router-dom';

function Portfolio(props) {
  return (
    <section className="portfolio wrapper">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__sites">
        <li className="portfolio__site">
          <Link to="#" target="_blank" className="portfolio__link">
            <p className="portfolio__text">Статичный сайт</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </Link>
        </li>
        <li className="portfolio__site">
          <Link to="#" target="_blank" className="portfolio__link">
            <p className="portfolio__text">Адаптивный сайт</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </Link>
        </li>
        <li className="portfolio__site">
          <Link to="#" target="_blank" className="portfolio__link">
            <p className="portfolio__text">Одностраничное приложение</p>
            <img className="portfolio__arrow" src={arrowSites} alt="Стрелка" />
          </Link>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;