import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import * as auth from "../../auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = React.useState(false);
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: currentUser.name,
    email: currentUser.email
  });

  function signOut() {
    auth.signOut()
      .then((res) => {
        if (res) {
          props.setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    localStorage.clear();
    navigate('/', { replace: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
      name: values.name,
      email: values.email
    })
  }

  useEffect(() => {
    if (isValid
      && (currentUser.name !== values.name
      || currentUser.email !== values.email)) {
      setIsEdit(true)
    } else {
      setIsEdit(false)
    }
  },[currentUser.email, currentUser.name, isValid, values.email, values.name])

  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        onClick={props.onClick}
      />
      <main className="content page__content">
        <section className="profile">
          <h1 className="profile__welcome">{`Привет, ${currentUser.name}!`}</h1>
          <form name="profile" className="profile__form-container" onSubmit={handleSubmit}>
            <div className="profile__form">
              <div className="profile__form-row">
                <label htmlFor="name" className="profile__label">Имя</label>
                <input
                  name="name"
                  id="name"
                  className="profile__input"
                  type="text"
                  placeholder="Имя"
                  minLength={2}
                  maxLength={30}
                  value={values.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <span
                className={`profile__error ${errors?.name || "" ? "profile__error_active" : ""}`}
              >
                {errors?.name}
              </span>
              <div className="profile__form-row">
                <label htmlFor="email" className="profile__label">E-mail</label>
                <input
                  name="email"
                  id="email"
                  className="profile__input"
                  type="email"
                  placeholder="E-mail"
                  minLength={2}
                  maxLength={30}
                  value={values.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <span
                className={`profile__error ${errors?.email || "" ? "profile__error_active" : ""}`}
              >
                {errors?.email}
              </span>
            </div>
            <div className="profile__button">
              <button
                className="profile__button-edit"
                type="submit"
                disabled={!isEdit}
              >
                Редактировать
              </button>
              <button
                onClick={signOut}
                className="profile__button-exit"
                type="button"
              >
                Выйти из аккаунта
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;