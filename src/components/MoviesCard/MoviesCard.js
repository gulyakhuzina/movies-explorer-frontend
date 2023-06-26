import React from 'react';
import "./MoviesCard.css"
import { useLocation } from 'react-router-dom';

function MoviesCard(props) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <li key={props.id} className={`movies__about ${props.like || (path === "/movies") ? "" : "movies__hidden"}`}>
      <div className="movies__text">
        <p className="movies__name">{props.name}</p>
        <p className="movies__duration">{props.duration}</p>
        {path === "/movies" ?
          <button className={`movies__like-button ${props.like ? "movies__like-button_active" : ""}`} type="button" /> :
          <button className="movies__close-button" type="button" />}
      </div>
      <a href={props.link} target="_blank" className="movies__link" rel="noopener noreferrer">
        <img className="movies__image" src={props.image} alt={props.name} />
      </a>
    </li>
  );
}

export default MoviesCard;