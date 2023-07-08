import React, { useCallback, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { api } from '../../utils/MainApi';
import { NOTHING_FOUND } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

function SavedMovies(props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [resultMessage, setResultMessage] = React.useState("");
  const [savedFilter, setSavedFilter] = React.useState([]);
  const [preload, setPreload] = React.useState(false);
  const [searchWordSaved, setSearchWordSaved] = React.useState("");
  const [moviesForRender, setMoviesForRender] = React.useState([]);
  const [likedMovies, setLikedMovies] = React.useState([]);
  const [isCheckedSaved, setIsCheckedSaved] = React.useState(false);
  const location = useLocation();

  const handleSearchMovies = (movies) => {
    const searchWordSaved = localStorage.getItem("searchWordSaved").toLowerCase();
    return movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchWordSaved)
    )
  }

  const handleSubmitSearch = async ({ searchWord: searchWordSaved }) => {
    try {
      setIsLoading(true);
      setResultMessage("");
      setPreload(true);
      localStorage.removeItem("searchWordSaved");
      localStorage.removeItem("filteredSavedMovies");
      localStorage.setItem("searchWordSaved", searchWordSaved);
      setLikedMovies(props.likedMovies);
      if (!likedMovies?.length) {
        const savedMovies = await api.getInitialCards();
        setLikedMovies(savedMovies);
      }
      const filteredSavedMovies = handleSearchMovies(likedMovies);
      if (!filteredSavedMovies.length) {
        setResultMessage(NOTHING_FOUND);
      }
      setSavedFilter(filteredSavedMovies);
      setMoviesForRender(filteredSavedMovies);
      localStorage.setItem("filteredSavedMovies", JSON.stringify(filteredSavedMovies));
    } catch (e) {
      setMoviesForRender([]);
      setResultMessage(e);
    } finally {
      setPreload(false);
    }
  }

  const handleCheckboxChecked = (movies, isCheckedSaved) => {
    if (isCheckedSaved) {
      return movies?.filter((movie) => movie.duration <= 40)
    } else {
      setResultMessage("");
      return likedMovies;
    }
  }

  const changeCheckbox = useCallback((isCheckedSaved) => {
    setIsCheckedSaved(isCheckedSaved);
    setIsLoading(true);
    localStorage.setItem("checkedSaved", JSON.stringify(isCheckedSaved));
    const checkedMovies = handleCheckboxChecked(savedFilter, isCheckedSaved);
    if (!checkedMovies?.length) {
      setResultMessage(NOTHING_FOUND);
      setMoviesForRender([]);
    } else {
      setResultMessage("");
      setMoviesForRender(checkedMovies);
    }
    setSavedFilter(checkedMovies);
    localStorage.setItem("filteredSavedMovies", JSON.stringify(savedFilter));
  }, [savedFilter])

  const handleDeleteMovie = async (movie) => {
    try {
      setPreload(true);
      const deletedCard = await api.deleteMovie(movie.movieId);
      setLikedMovies(likedMovies?.filter(c => c.movieId !== deletedCard.movieId));
      localStorage.setItem("likedMovies", JSON.stringify(likedMovies?.filter(c => c.movieId !== deletedCard.movieId)));
      // setSavedFilter(localStorage.getItem("filteredSavedMovies"));
      setSavedFilter(savedFilter?.filter(c => c.movieId !== deletedCard.movieId));
      console.log(savedFilter);
      localStorage.setItem("filteredSavedMovies", JSON.stringify(savedFilter?.filter(c => c.movieId !== deletedCard.movieId)));
      const filteredSavedMovieslocal = JSON.parse(localStorage.getItem("filteredSavedMovies"));
      const likedMovieslocal = JSON.parse(localStorage.getItem("likedMovies"));
      if (filteredSavedMovieslocal.length === 0
        || likedMovieslocal.length === 0) {
        setResultMessage(NOTHING_FOUND);
      } else setResultMessage("");
      setMoviesForRender(JSON.parse(localStorage.getItem("filteredSavedMovies")));
    }
    catch (e) {
      console.log(e)
    } finally {
      setPreload(false);
    }
  }

  useEffect(() => {
    if (props.loggedIn) {
      api
        .getInitialCards()
        .then((moviesData) => {
          localStorage.setItem("likedMovies", JSON.stringify(moviesData));
          setLikedMovies(moviesData);
          console.log(!moviesForRender.length);
          if (!moviesForRender.length) {
            setMoviesForRender(moviesData);
            setSavedFilter(moviesData);
          }
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, [])

  useEffect(() => {
    if (isCheckedSaved) {
      changeCheckbox(isCheckedSaved);
    }
  }, [isCheckedSaved])

  useEffect(() => {
    const localFilteredMovies = JSON.parse(localStorage.getItem("filteredSavedMovies"));
    const localIsChecked = JSON.parse(localStorage.getItem("checkedSaved"));
    const localSearchWord = localStorage.getItem("searchWordSaved");
    if (!localFilteredMovies?.length) {
      setResultMessage(NOTHING_FOUND);
    } else {
      setResultMessage("");
    }
    setMoviesForRender(
      handleCheckboxChecked(localFilteredMovies, localIsChecked)
    );
    setIsCheckedSaved(localIsChecked);
    setSavedFilter(localFilteredMovies);
    setSearchWordSaved(localSearchWord);
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
          isChecked={isCheckedSaved}
          searchWord={searchWordSaved}
          setSearchWord={setSearchWordSaved}
        />
        {preload ? <Preloader /> :
          <MoviesCardList
            isLoading={isLoading}
            movies={moviesForRender}
            handleDeleteMovie={handleDeleteMovie}
            resultMessage={resultMessage}
          />
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;