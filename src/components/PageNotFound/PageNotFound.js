import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./PageNotFound.css"

function PageNotFound(props) {
  const navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }
  return (
    <main className="content page__content">
      <section>
        <div className="not-found">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__subtitle">Страница не найдена</p>
          <button className="not-found__button" onClick={goBack} type="button">Назад</button>
        </div>
      </section>
    </main>
  );
}

export default PageNotFound;