import React from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import "./NavBar.css";

function NavBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  function signIn() {
    navigate('/signin', { replace: true });
  }

  function profileClick() {
    navigate('/profile', { replace: true });
  }

  return (
    <>
      {path === "/signup" ? <h1 className="header__welcome">Добро пожаловать!</h1> : <></>}
      {path === "/signin" ? <h1 className="header__welcome">Рады видеть!</h1> : <></>}
      {path === "/" ? <nav className="header__links">
        <NavLink to="/signup" className="header__link">Регистрация</NavLink>
        <button onClick={signIn} className="header__button" type="button">Войти</button>
      </nav> : <></>}
      {(props.loggedIn && path !== "/") ? <>
        <nav className="header__links header__links_login">
          <div>
            <NavLink to="/movies" className={({ isActive }) => `header__link-nav ${isActive ? "header__link-nav_active" : ""}`}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className={({ isActive }) => `header__link-nav ${isActive ? "header__link-nav_active" : ""}`}>Сохранённые фильмы</NavLink>
          </div>
          <button onClick={profileClick} className="header__button-nav" type="button">Аккаунт</button>
        </nav>
        <div className="menu-button" onClick={props.onClick}>
          <div className="menu-line menu-line_1"></div>
          <div className="menu-line menu-line_2"></div>
          <div className="menu-line menu-line_3"></div>
        </div>
      </> : <></>}
    </>
  );
}

export default NavBar;