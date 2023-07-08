import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';
import Preloader from '../Preloader/Preloader';

function Login(props) {
  const { values, handleChange, errors, isValid, resetForm, setValues } = useFormWithValidation({
    email: '',
    password: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(values, resetForm);
  }

  return (props.loggedIn ? (
    <Navigate to="/" replace />
  ) :
    <>
      <Header />
      {props.preload ? <Preloader /> : <AuthForm
        title="login"
        text="Ещё не зарегистрированы? "
        link={<Link to="/signup" className="auth__link">Регистрация</Link>}
        textButton="Войти"
        errors={errors}
        isValid={isValid}
        email={values.email}
        password={values.password}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loggedIn={props.loggedIn}
        errorsForm={props.errorsForm}
      />
      }
    </>
  );
}

export default Login;