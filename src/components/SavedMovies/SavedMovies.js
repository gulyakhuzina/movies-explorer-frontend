import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        onClick={props.onClick}
      />
      <main className="content wrapper wrapper_movies">
        <SearchForm
          onSearch={props.onSearch}
        />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;