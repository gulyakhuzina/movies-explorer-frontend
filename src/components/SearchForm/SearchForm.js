import React from 'react';
import "./SearchForm.css"
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <section>
      <form className="movies__search-form">
        <div className="movies__search">
          <input className='movies__search-input' placeholder="Фильм" />
          <button className="movies__search-button" onClick={props.onSearch} type="submit" />
        </div>
        <span className="movies__search-line"></span>
        <label className="movies__search-checkbox">
          {path === "/saved-movies" ?
            <input type="checkbox" className="movies__search-invisible-checkbox" defaultChecked /> :
            <input type="checkbox" className="movies__search-invisible-checkbox" />}
          <span className="movies__search-visible-checkbox"></span>
          <span className="movies__search-text">Короткометражки</span>
        </label>
      </form>
    </section>
  );
}

export default SearchForm;