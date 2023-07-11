import React from 'react';
import "./Footer.css"

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__about">
        <p className="footer__year">© 2023</p>
        <ul className="footer__tech">
          <li>
            <a href="https://practicum.yandex.ru/" target="_blank" className="footer__tech-link" rel="noopener noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a href="https://github.com/gulyakhuzina"
              target="_blank"
              className="footer__tech-link"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;