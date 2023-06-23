import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./PageNotFound.css"

function PageNotFound(props) {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
  return (
    <div className="not-found">
      <h3 className="not-found__title">404</h3>
      <h4 className="not-found__subtitle">Страница не найдена</h4>
      <button className="not-found__button" onClick={goBack}>Назад</button>
    </div>
  );
}

export default PageNotFound;