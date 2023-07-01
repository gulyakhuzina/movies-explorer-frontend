import React from 'react';
import "./SearchForm.css"
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <section>
      <form className="search">
        <div className="search__form">
          <input className='search__input' placeholder="Фильм" type="text" required />
          <button className="search__button" onClick={props.onSearch} type="submit" />
        </div>
        <label className="search__checkbox">
          {path === "/saved-movies" ?
            <input type="checkbox" className="search__checkbox-invisible" defaultChecked /> :
            <input type="checkbox" className="search__checkbox-invisible" />}
          <span className="search__checkbox-visible"></span>
          <span className="search__checkbox-text">Короткометражки</span>
        </label>

      </form>
    </section>
  );
}

export default SearchForm;