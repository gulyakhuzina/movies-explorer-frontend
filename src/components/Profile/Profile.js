import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Header from '../Header/Header';

function Profile(props) {
  const [active, setActive] = React.useState(false);

  const navigate = useNavigate();
  function signOut() {
    navigate('/', { replace: true });
  }

  function handleClick() {
    setActive(!active);
  }
  return (
    <>
      <Header
        loggedIn={props.loggedIn}
        onClick={props.onClick}
      />
      <main className="content page__content">
        <section className="profile">
          <h2 className="profile__welcome">Привет, Виталий!</h2>
          <form name="profile" className="profile__form" onSubmit={props.onSubmit}>
            <label htmlFor="name" className="profile__label">Имя</label>
            <input name="name" id="name" className="profile__input" type="text" defaultValue="Виталий" required disabled={!active} />
            <label htmlFor="email" className="profile__label">Почта</label>
            <input name="email" id="email" className="profile__input" type="email" defaultValue="pochta@yandex.ru|" required disabled={!active} />
          </form>
          <div className="profile__button">
            <button onClick={handleClick} className={`profile__button-edit ${active ? "profile__button_hidden" : ""}`}>Редактировать</button>
            <button onClick={handleClick} className={`profile__button-save ${!active ? "profile__button_hidden" : ""}`}>Сохранить</button>
            <button onClick={signOut} className={`profile__button-exit ${active ? "profile__button_hidden" : ""}`}>Выйти из аккаунта</button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;