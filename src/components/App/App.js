import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
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
import * as auth from "../../auth";
import { api } from "../../utils/MainApi";
import Popup from "../Popup/Popup";
import { SERVER_ERROR } from "../../utils/constants";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const myRef = React.createRef();
  const [currentUser, setCurrentUser] = React.useState({});
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isFailPopupOpen, setIsFailPopupOpen] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [preload, setPreload] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const dateOfCreate = new Date(localStorage.getItem('timeCreate'));
    if (((+new Date() - dateOfCreate) / 1000 / 60 > 60)
      && (localStorage.getItem('timeCreate'))) {
      localStorage.removeItem('authorized');
      localStorage.removeItem('timeCreate')
      setLoggedIn(false);
    }
    tokenCheck();
  }, [loggedIn])

  function tokenCheck() {
    if (localStorage.getItem('authorized')) {
      api.getUserInfo()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate(location.pathname, { replace: true });
            setCurrentUser(res);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      navigate('/movies', { replace: true })
    }
  }

  function burgerClick() {
    document.querySelector(".menu").classList.toggle("menu_visible");
    document.querySelector(".menu").classList.toggle("menu_shadow");
    document.querySelector(".menu-button").classList.toggle("menu-button_close");
    const lines = document.querySelectorAll(".menu-line");

    lines.forEach((line) => {
      line.classList.toggle("menu-close");
    })
  }

  function scrollToMyRef() {
    window.scrollTo(0, myRef.current.scrollHeight);
  };

  function handleSubmitReg(values) {
    setPreload(true);
    auth.register(values.password, values.email, values.name)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        setErrors(err);
      })
      .finally((err) => {
        setPreload(false);
      });
  }

  function handleSubmitAuth(values, resetForm) {
    if (!values.password || !values.email) {
      return;
    }
    setPreload(true);
    auth.authorize(values.password, values.email)
      .then((data) => {
        if (data.token) {
          resetForm();
          setCurrentUser(data);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch(err => {
        setErrors(err);
      })
      .finally((err) => {
        setPreload(false);
      });
  }

  const handleAddLike = async (movie) => {
    try {
      const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
      const newCard = await api.addMovie(movie);
      setLikedMovies([...likedMovies, newCard]);
      filteredMovies.map((c) => {
        if (c.id === newCard.movieId) {
          c.like = true;
        }
        return c;
      })
      movie.like = !movie.like;
      localStorage.setItem("likedMovies", JSON.stringify([...likedMovies, newCard]));
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    }
    catch (e) {
      setErrors(SERVER_ERROR)
    }
  }

  const handleDeleteLike = async (movie) => {
    try {
      const filteredMovies = JSON.parse(localStorage.getItem('filteredMovies'));
      const savedMovie = likedMovies.find(
        (card) => card.movieId === movie.id || card.movieId === movie.movieId
      );
      const deletedCard = await api.deleteMovie(savedMovie._id)
      setLikedMovies(likedMovies?.filter(c => c._id !== savedMovie._id));
      filteredMovies.map((c) => {
        if (c.id === deletedCard.movieId) {
          c.like = false;
        }
        return c;
      })
      movie.like = !movie.like;
      localStorage.setItem("likedMovies", JSON.stringify(likedMovies?.filter(c => c.movieId !== deletedCard.movieId)));
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    }
    catch (e) {
      setErrors(SERVER_ERROR)
    }
  }

  function handleSubmitEdit({ name, email }) {
    api.editUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setIsSuccessPopupOpen(true);
      })
      .catch((err) => {
        setIsFailPopupOpen(true);
        console.log(err);
      })
  }

  function closePopup() {
    setIsSuccessPopupOpen(false);
    setIsFailPopupOpen(false);
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((moviesData) => {
          localStorage.setItem("likedMovies", JSON.stringify(moviesData));
          setLikedMovies(moviesData);
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, [])

  useEffect(() => {
    setErrors([])
  }, [location.pathname])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/signup/*" element={
            <Register
              onSubmit={handleSubmitReg}
              setLoggedIn={setLoggedIn}
              errorsForm={errors}
              preload={preload} />}
          />
          <Route path="/signin/*" element={
            <Login
              onSubmit={handleSubmitAuth}
              setLoggedIn={setLoggedIn}
              errorsForm={errors}
              preload={preload} />
          }
          />
          <Route path="/profile/*" element={<ProtectedRouteElement
            element={Profile}
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
            onClick={burgerClick}
            onSubmit={handleSubmitEdit} />}
          />
          <Route path="/movies/*" element={<ProtectedRouteElement
            element={Movies}
            loggedIn={loggedIn}
            onClick={burgerClick}
            handleAddLike={handleAddLike}
            handleDeleteLike={handleDeleteLike}
            likedMovies={likedMovies}
            setLikedMovies={setLikedMovies}
          />}
          />
          <Route path="/saved-movies/*" element={<ProtectedRouteElement
            element={SavedMovies}
            likedMovies={likedMovies}
            loggedIn={loggedIn}
            onClick={burgerClick}
          />}
          />
          <Route exact path="/" element={
            <Main
              onClick={burgerClick}
              loggedIn={loggedIn}
              scrollTo={scrollToMyRef}
              myRef={myRef}
            />}
          />
          <Route exact path="*" element={
            <PageNotFound />}
          />
          <Route path="*" element={loggedIn ? <Navigate to="/movies" replace /> : <Navigate to="/" replace />} />
        </Routes>
        <BurgerMenu
          onClick={burgerClick}
        />
        <Popup
          name="infoTooltip"
          isOpen={isSuccessPopupOpen}
          title="Данные успешно изменены!"
          onClose={closePopup}
        />

        <Popup
          name="infoTooltip"
          isOpen={isFailPopupOpen}
          title="Что-то пошло не так! Попробуйте ещё раз."
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
