import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./Movies.css"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { moviesapi } from '../../utils/MoviesApi';
import { api } from '../../utils/MainApi';
import { NOTHING_FOUND, SERVER_ERROR } from '../../utils/constants';


function Movies(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const [preload, setPreload] = React.useState(false);
  const [resultMessage, setResultMessage] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [moviesForRender, setMoviesForRender] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState("");
  const location = useLocation();

  const handleCheckboxChecked = (movies, isChecked) => {
    if (isChecked) {
      return movies?.filter((movie) => movie.duration <= 40)
    } else {
      setResultMessage("");
      return movies;
    }
  }

  const changeCheckbox = useCallback((isChecked) => {
    setIsChecked(isChecked);
    setIsLoading(true);
    localStorage.setItem("checked", JSON.stringify(isChecked));
    const checkedMovies = handleCheckboxChecked(filter, isChecked);
    if (!checkedMovies?.length) {
      setResultMessage(NOTHING_FOUND);
      setMoviesForRender([]);
    } else {
      setResultMessage("");
      setMoviesForRender(checkedMovies);
    }
  }, [filter])

  const handleSearchMovies = (allMovies) => {
    const searchWord = localStorage.getItem("searchWord");
    return allMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchWord.toLowerCase())
    )
  }

  const handleSubmitSearch = async ({ searchWord }) => {
    try {
      setResultMessage("");
      console.log(searchWord);
      setIsLoading(true);
      setPreload(true);
      localStorage.removeItem("searchWord");
      localStorage.removeItem("filteredMovies");
      localStorage.setItem("searchWord", searchWord);
      if (!movies?.length) {
        const allMovies = await moviesapi.getMovies();
        setMovies(allMovies);
        const filteredMovies = handleSearchMovies(allMovies);
        if (!filteredMovies.length) {
          setResultMessage(NOTHING_FOUND);
        }
        setFilter(filteredMovies);
        setMoviesForRender(filteredMovies);
        localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      } else {
        const filteredMovies = handleSearchMovies(movies);
        if (!filteredMovies.length) {
          setResultMessage(NOTHING_FOUND);
        }
        setFilter(filteredMovies);
        setMoviesForRender(filteredMovies);
        localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
        console.log(filteredMovies);
      }
    } catch (e) {
      setMovies([]);
      setResultMessage(SERVER_ERROR);
    }
    finally {
      setPreload(false);
    }
  }

  useEffect(() => {
    if (props.loggedIn) {
      api
        .getInitialCards()
        .then((moviesData) => {
          props.setLikedMovies(moviesData);
          localStorage.setItem("likedMovies", JSON.stringify(moviesData));
        })
        .catch((e) => {
          setResultMessage(SERVER_ERROR);
        })
    }
  }, [props.loggedIn, setFilter])

  useEffect(() => {
    if (isChecked) {
      changeCheckbox(isChecked);
    }
  }, [changeCheckbox, isChecked, resultMessage])

  useEffect(() => {
    const localFilteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
    const localIsChecked = JSON.parse(localStorage.getItem("checked"));
    const localSearchWord = localStorage.getItem("searchWord");
    setMoviesForRender(
      handleCheckboxChecked(localFilteredMovies, localIsChecked)
    );
    setIsChecked(localIsChecked);
    setFilter(localFilteredMovies);
    setSearchWord(localSearchWord);
  }, [location.pathname])

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        onClick={props.onClick}
      />
      <main className="content wrapper wrapper_movies">
        <SearchForm
          onSearch={handleSubmitSearch}
          onChange={changeCheckbox}
          isChecked={isChecked}
          searchWord={searchWord}
          setSearchWord={setSearchWord}
        />
        {preload ? <Preloader /> :
          <MoviesCardList
            movies={moviesForRender}
            resultMessage={resultMessage}
            isLoading={isLoading}
            lengthArray={moviesForRender?.length}
            likedMovies={props.likedMovies}
            handleAddLike={props.handleAddLike}
            handleDeleteLike={props.handleDeleteLike}
          />
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;