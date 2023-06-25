import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import '../../vendor/normalize.css';
import './App.css';
import '../../vendor/fonts/fonts.css';
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [preload, setPreload] = React.useState(false);

  function burgerClick() {
    document.querySelector(".menu").classList.toggle("menu_visible");
    document.querySelector(".menu").classList.toggle("menu_shadow");
    document.querySelector(".menu-button").classList.toggle("menur-button_close");
    const lines = document.querySelectorAll(".menu-line");

    lines.forEach((line) => {
      line.classList.toggle("menu-close");
    })
  }

  function searchClick(evt) {
    evt.preventDefault();
    setPreload(true);
    setTimeout(() => setPreload(false), 1000);
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/signup/*" element={
          <Register />}
        />
        <Route path="/signin/*" element={
          <Login />}
        />
        <Route path="/profile/*" element={
          <Profile
            loggedIn={loggedIn}
            onClick={burgerClick}
          />}
        />
        <Route path="/movies/*" element={
          <Movies
            loggedIn={loggedIn}
            onClick={burgerClick}
            loader={preload}
            onSearch={searchClick}
          />}
        />
        <Route path="/saved-movies/*" element={
          <SavedMovies
            loggedIn={loggedIn}
            onClick={burgerClick}
            loader={preload}
            onSearch={searchClick}
          />}
        />
        <Route exact path="/" element={
          <Main
            onClick={burgerClick}
          />}
        />
        <Route exact path="*" element={
          <PageNotFound />}
        />
      </Routes>
      <BurgerMenu
        onClick={burgerClick}
      />
    </div>
  );
}

export default App;
