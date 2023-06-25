import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuthForm.css';

function AuthForm(props) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <main className="content page__content">
      <section className="auth">
        <form name={`${props.name}`} className="auth__form" onSubmit={props.onSubmit}>
          {path === "/signup" ? <>
            <label htmlFor="name" className="auth__label">Имя</label>
            <input
              name="name"
              id="name"
              className="auth__input"
              type="text"
              placeholder="Имя"
              minLength={2}
              maxLength={30}
              defaultValue="Виталий"
              required
            />
          </> : <></>}
          <label htmlFor="email" className="auth__label">E-mail</label>
          <input
            name="email"
            id="email"
            className="auth__input"
            type="email"
            placeholder="E-mail"
            minLength={2}
            maxLength={30}
            defaultValue="pochta@yandex.ru|"
            required
          />
          <label htmlFor="password" className="auth__label">Пароль</label>
          <input
            name="password"
            id="password"
            className="auth__input auth__input_pass"
            type="password"
            placeholder="Пароль"
            minLength={2}
            maxLength={30}
            defaultValue="12345678901234"
            required />
          {path === "/signup" ? <p className="auth__error">Что-то пошло не так...</p> : <></>}
          <button className={`auth__submit-button ${path === "/signin" ? "auth__submit-button_indent" : ""}`} type="submit">{`${props.textButton}`}</button>
          <p className="auth__text">{props.text}{props.link}</p>
        </form>
      </section>
    </main>
  );
}

export default AuthForm;