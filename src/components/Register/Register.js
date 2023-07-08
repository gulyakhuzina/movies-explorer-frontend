import React from 'react';
import './Register.css';
import { Link, Navigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Header from '../Header/Header';
import AuthForm from '../AuthForm/AuthForm';
import Preloader from '../Preloader/Preloader';

function Register(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({
    name: '',
    email: '',
    password: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(values);
  }
  return (props.loggedIn ? (
    <Navigate to="/" replace />
  ) :
    <>
      <Header />
      {props.preload ? <Preloader /> : <AuthForm
        title="register"
        textButton="Зарегистрироваться"
        text="Уже зарегистрировались? "
        link={<Link to="/signin" className="auth__link">Войти</Link>}
        errors={errors}
        isValid={isValid}
        name={values.name || ""}
        email={values.email || ""}
        password={values.password || ""}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loggedIn={props.loggedIn}
        errorsForm={props.errorsForm}
      />
      }
    </>
  );
}

export default Register;