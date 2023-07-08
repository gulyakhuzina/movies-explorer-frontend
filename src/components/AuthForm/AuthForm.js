import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuthForm.css';

function AuthForm(props) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <main className="content page__content">
      <section className="auth">
        <form name={`${props.title}`} className="auth__form" onSubmit={props.onSubmit} noValidate>
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
              value={props.name}
              onChange={props.onChange}
              required
            />
            <span
              className={`auth__error ${props.errors?.name || "" ? "auth__error_active" : ""}`}
            >
              {props.errors.name}
            </span>
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
            value={props.email}
            onChange={props.onChange}
            required
          />
          <span
            className={`auth__error ${props.errors?.email || "" ? "auth__error_active" : ""}`}
          >
            {props.errors.email}
          </span>
          <label htmlFor="password" className="auth__label">Пароль</label>
          <input
            name="password"
            id="password"
            className="auth__input auth__input_pass"
            type="password"
            placeholder="Пароль"
            minLength={2}
            maxLength={30}
            value={props.password}
            onChange={props.onChange}
            required />
          <span
            className={`auth__error ${props.errors?.password || "" ? "auth__error_active" : ""}`}
          >
            {props.errors.password}
          </span>
          <span className={`auth__error ${props.errorsForm || "" ? "auth__error_active" : ""}`}>
            {props.errorsForm}
          </span>
          <button
            className={`auth__submit-button ${path === "/signin" ? "auth__submit-button_indent" : ""}`}
            type="submit" disabled={!props.isValid}
          >
            {`${props.textButton}`}
          </button>
          <p className="auth__text">{props.text}{props.link}</p>
        </form>
      </section>
    </main>
  );
}

export default AuthForm;