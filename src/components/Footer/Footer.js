import React from 'react';
import "./Footer.css"

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__about">
        <p className="footer__year">© 2023</p>
        <ul className="footer__tech">
          <li>Яндекс.Практикум</li>
          <li>Github</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;