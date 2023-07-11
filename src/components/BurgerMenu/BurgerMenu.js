import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./BurgerMenu.css"

function BurgerMenu(props) {
  const navigate = useNavigate();

  function profileClick() {
    navigate('/profile', { replace: true });
    props.onClick();
  }

  return (
    <div className="menu">
      <nav className="menu__container">
        <div className="menu__container-main">
          <NavLink to="/" onClick={props.onClick} className={({ isActive }) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Главная</NavLink>
          <NavLink to="/movies" onClick={props.onClick} className={({ isActive }) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Фильмы</NavLink>
          <NavLink to="/saved-movies" onClick={props.onClick} className={({ isActive }) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Сохранённые фильмы</NavLink>
        </div>
        <button onClick={profileClick} className="menu__link menu__link_account" type="button">Аккаунт</button>
      </nav>
    </div>
  );
}

export default BurgerMenu;