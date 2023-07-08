import React from 'react';
import "./MoviesCard.css"
import { useLocation } from 'react-router-dom';
import { MOVIES_API_URL } from "../../utils/constants";

function MoviesCard(props) {
  const location = useLocation();
  const path = location.pathname;

  function timeConvert(num) {
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    if (rhours !== 0) {
      if (rminutes !== 0) {
        return rhours + "ч " + rminutes + "м";
      } else {
        return rhours + "ч";
      }
    } else {
      return rminutes + "м";
    }
  }

  function handleDeleteClick() {
    props.handleDeleteLike(props.movie);
  }

  function handleAddClick() {
    props.handleAddLike(props.movie);
  }

  function handleDeleteSavedMovie() {
    props.handleDeleteMovie(props.movie);
  }

  return (
    <li key={props.id} className="movies__about">
      <div className="movies__text">
        <p className="movies__name">{props.nameRU}</p>
        <p className="movies__duration">{timeConvert(props.duration)}</p>
        {path === "/movies"
        ? <button
            className={`movies__like-button ${props.isSaved ? "movies__like-button_active" : ""}`}
            type="button"
            onClick={props.isSaved ? handleDeleteClick : handleAddClick} />
        : <button
            className="movies__delete-button"
            onClick={handleDeleteSavedMovie}
            type="button" />}
      </div>
      <a href={props.link} target="_blank" className="movies__link" rel="noopener noreferrer">
        <img className="movies__image" src={(path === "/movies") ? MOVIES_API_URL + props.image.url : props.movie.image} alt={props.name} />
      </a>
    </li>
  );
}

export default MoviesCard;