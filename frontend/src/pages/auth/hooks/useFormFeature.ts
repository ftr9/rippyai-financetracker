import { useState } from 'react';

export type FIELDS = 'email' | 'password' | 'username';
export const useFormFeature = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [inputErrMsg, setInputErrMsg] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [hasInputErr, setInputErr] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const resetErrAndMsg = () => {
    setInputErr({
      email: false,
      password: false,
      username: false,
    });
    setInputErrMsg({
      email: '',
      password: '',
      username: '',
    });
  };
  const setErrorField = (field: FIELDS, message: string) => {
    setInputErr((state) => ({ ...state, [field]: true }));
    setInputErrMsg((state) => ({ ...state, [field]: message }));
  };

  return {
    inputValue,
    setInputValue,
    inputErrMsg,
    hasInputErr,
    isSubmitting,
    setSubmitting,
    resetErrAndMsg,
    setErrorField,
  };
};
