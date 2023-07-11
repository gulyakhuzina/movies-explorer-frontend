import React from 'react';
import "./SearchForm.css"
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
  const location = useLocation();
  const path = location.pathname;

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    searchWord: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onSearch({
      searchWord: values.searchWord
    })
  }

  function handleChangeSearch(e) {
    props.setSearchWord(e.target.value)
    handleChange(e);
  }

  function handleChangeCheckbox(e) {
    props.onChange(e.target.checked)
  }

  return (
    <section>
      <form name="searchForm" onSubmit={handleSubmit} className="search" noValidate>
        <div className="search__form-container">
          <div className="search__form">
            <label className="search__label">
              <input
                name="searchWord"
                className="search__input"
                placeholder="Фильм"
                value={props.searchWord || ""}
                type="text"
                minLength={1}
                onChange={handleChangeSearch}
                required
              />
            </label>
            {path === "/movies"
              ? <button
                className="search__button"
                type="submit"
                disabled={!isValid}
              />
              : <button
                className="search__button"
                type="submit"
              />
            }
          </div>
          <label className="search__checkbox">
            <input
              name="checkbox"
              type="checkbox"
              checked={props.isChecked || false}
              className="search__checkbox-invisible"
              onChange={handleChangeCheckbox}
            />
            <span className="search__checkbox-visible"></span>
            <span className="search__checkbox-text">Короткометражки</span>
          </label>
        </div>
        {path === "/movies"
          && <span
            className={`search__error ${errors?.searchWord || "" ? "search__error_active" : ""}`}
          >
            {errors?.searchWord}
          </span>}
      </form>
    </section>
  );
}

export default SearchForm;