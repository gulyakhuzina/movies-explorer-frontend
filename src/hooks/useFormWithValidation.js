import React, { useCallback } from 'react';
import validator from 'validator';

export function useFormWithValidation(inputValues) {
  const [values, setValues] = React.useState(inputValues || "");
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    if (name === "name" && (!new RegExp(/^[а-яА-ЯёЁa-zA-Z\s/-]+$/).test(value))) {
      target.setCustomValidity(
        "Имя должно содержать только кириллицу, латиницу, пробел или дефис."
      );
    } else if (name === "email" && !validator.isEmail(value)) {
      target.setCustomValidity(
        "Необходимо указать e-mail в формате name@domain.zone"
      );
    } else {
      target.setCustomValidity("");
    }

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}