import React, { useCallback, useEffect } from 'react';
import "./MoviesCardList.css"
// import movies from "../../utils/data";
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { handleIsSaved } from '../../utils/utils';

function MoviesCardList(props) {
  const location = useLocation();
  const path = location.pathname;
  const [visibleMovies, setVisibleMovies] = React.useState([]);
  const [step, setStep] = React.useState(testIsDesktop);
  const size = useWindowSize();

  function testIsDesktop() {
    if (typeof window === 'undefined') {
      return 7;
    }
    if (window.innerWidth >= 480) {
      return 7;
    } else {
      return 5;
    }
  }

  function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  useEffect(() => {
    if (location.pathname === "/movies") {
      if (size.width < 480) {
        setStep(5);
      } else {
        setStep(7);
      }
      setVisibleMovies(props.movies?.slice(0, step));
    }
  }, [props.movies, size.width, location.pathname, step])

  const handleMoreMovies = useCallback(() => {
    const start = visibleMovies.length;
    const end = start + step;
    const count = props.movies.length - start;
    if (count > 0) {
      const addedMovies = props.movies.slice(start, end);
      setVisibleMovies([...visibleMovies, ...addedMovies]);
    }
  }, [props.movies, step, visibleMovies])

  return (
    <>
      <section>
        <p
          className={`movies-not-found ${props.isLoading && props.resultMessage
            ? ""
            : "movies-not-found_hidden"}`}
        >
          {props.resultMessage}
        </p>
        {location.pathname === "/movies"
          ? visibleMovies?.length > 0 && <ul className="movies">
            {visibleMovies?.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.id}
                nameRU={movie.nameRU}
                duration={movie.duration}
                image={movie.image}
                link={movie.trailerLink}
                handleAddLike={props.handleAddLike}
                handleDeleteLike={props.handleDeleteLike}
                likedMovies={props.likedMovies}
                isSaved={handleIsSaved(movie)}
              />
            ))}
          </ul>
          : props.movies?.length > 0 && <ul className="movies">
            {props.movies.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.movieId}
                nameRU={movie.nameRU}
                duration={movie.duration}
                image={movie.image}
                link={movie.trailerLink}
                handleLikeButton={props.handleLikeButton}
                handleDeleteMovie={props.handleDeleteMovie}
              />
            ))}
          </ul>}
        <div className={`movies-more ${(path === "/saved-movies")
          || !visibleMovies
          || (props.lengthArray < step + 1)
          || (visibleMovies?.length >= props.lengthArray) ? "movies-more_hidden" : ""}`}>
          <button className="movies-more__button"
            type="button"
            onClick={handleMoreMovies}>Ещё</button>
        </div>
      </section>
    </>
  );
}

export default MoviesCardList;