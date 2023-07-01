import React from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';

function Register(props) {
  return (
    <>
      <Header />
      <AuthForm
        name="register"
        textButton="Зарегистрироваться"
        text="Уже зарегистрировались? "
        link={<Link to="/signin" className="auth__link">Войти</Link>}
      />
    </>
  );
}

export default Register;