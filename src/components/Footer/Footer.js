import React from 'react';
import "./Footer.css"
import { Link } from 'react-router-dom';

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__about">
        <p className="footer__year">© 2023</p>
        <ul className="footer__tech">
          <li>
            <Link to="#" target="_blank" className="footer__tech-link">Яндекс.Практикум</Link>
          </li>
          <li>
            <Link  to="#" target="_blank" className="footer__tech-link">Github</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;