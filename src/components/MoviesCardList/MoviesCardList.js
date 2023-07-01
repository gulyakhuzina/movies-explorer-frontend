import React from 'react';
import "./MoviesCardList.css"
import movies from "../../utils/data";
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      <section>
        <ul className="movies">
          {movies.map((movie) => (
            <MoviesCard
              key={movie.id}
              name={movie.name}
              duration={movie.duration}
              image={movie.image}
              like={movie.like}
              link={movie.link}
            />
          ))}
        </ul>
        <div className={`movies-more ${path === "/saved-movies" ? "movies-more_hidden" : ""}`}>
          <button className="movies-more__button" type="button">Ещё</button>
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;