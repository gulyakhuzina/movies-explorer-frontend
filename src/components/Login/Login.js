import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';

function Login(props) {
  return (
    <>
      <Header />
      <AuthForm
        name="login"
        title="Вход"
        text="Ещё не зарегистрированы? "
        link={<Link to="/signup" className="auth__link">Регистрация</Link>}
        textButton="Войти"
      />
    </>
  );
}

export default Login;