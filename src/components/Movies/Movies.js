import React from 'react';
import "./Movies.css"
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        onClick={props.onClick}
      />
      <main className="content page__content page__content_movies">
        <SearchForm
          onSearch={props.onSearch}
        />
        <MoviesCardList />
      </main>
      <Footer />
      {props.loader && <Preloader />}
    </>
  );
}

export default Movies;