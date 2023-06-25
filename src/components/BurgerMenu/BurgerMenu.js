import React from 'react';
import { NavLink } from 'react-router-dom';
import "./BurgerMenu.css"

function BurgerMenu(props) {
  return (
    <div className="menu">
      <nav className="menu__container">
        <div className="menu__container-main">
          <NavLink to="/" onClick={props.onClick} className={({ isActive }) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Главная</NavLink>
          <NavLink to="/movies" onClick={props.onClick} className={({ isActive }) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Фильмы</NavLink>
          <NavLink to="/saved-movies" onClick={props.onClick} className={({ isActive }) => `menu__link ${isActive ? "menu__link_active" : ""}`}>Сохранённые фильмы</NavLink>
        </div>
        <NavLink to="/profile" onClick={props.onClick} className={({ isActive }) => `menu__link menu__link_account ${isActive ? "menu__link_active" : ""}`}>Аккаунт</NavLink>
      </nav>
    </div>
  );
}

export default BurgerMenu;