import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Header.css"
import logoHeader from '../../images/logo-header.svg';
import NavBar from '../NavBar/NavBar';

function Header(props) {
  const location = useLocation();
  return (
    <header className={`header 
    ${location.pathname === "/" ? "header_pink" : ""} 
    ${(location.pathname === "/signin") || (location.pathname === "/signup") ? "header_entry" : ""}`}>
      <Link to="/">
        <img className="header__logo" src={logoHeader} alt="Логотип" />
      </Link>
      <NavBar
        loggedIn={props.loggedIn}
        onClick={props.onClick}
      />
    </header>
  );
}

export default Header;