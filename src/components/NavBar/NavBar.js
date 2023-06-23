import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "./NavBar.css";

function NavBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  function signIn() {
    navigate('/signin', { replace: true });
  }

  return (
    <>
      {path === "/signup" ? <p className="header__welcome">Добро пожаловать!</p> : <></>}
      {path === "/signin" ? <p className="header__welcome">Рады видеть!</p> : <></>}
      {path === "/" ? <div className="header__links">
        <Link to="/signup" className="header__link">Регистрация</Link>
        <button onClick={signIn} className="header__button">Войти</button>
      </div> : <></>}
      {(props.loggedIn && path !== "/") ? <>
        <div className="header__links header__links_login">
          <Link to="/movies" className="header__link">Фильмы</Link>
          <Link to="/saved-movies" className="header__link">Сохранённые фильмы</Link>
          <Link to="/profile" className="header__link">Аккаунт</Link>
        </div>
        <div className="menu__burger-button" onClick={props.onClick}>
          <div className="menu__burger-line menu__burger-line_1"></div>
          <div className="menu__burger-line menu__burger-line_2"></div>
          <div className="menu__burger-line menu__burger-line_3"></div>
        </div>
      </> : <></>}
    </>
  );
}

export default NavBar;