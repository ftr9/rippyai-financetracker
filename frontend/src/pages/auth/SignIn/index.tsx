import React from 'react';
import HeaderTitle from '../../../common/typography/Header';
import InputField from '../../../common/Input/InputField';
import { Button, Text } from '@tremor/react';
import { useUserStore } from '../../../store/useUserStore';
import { useNavigate, Link } from 'react-router-dom';
import { useFormFeature, FIELDS } from '../hooks/useFormFeature';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const SignIN = () => {
  const navigation = useNavigate();
  const { signIn } = useUserStore();

  const {
    inputValue,
    setInputValue,
    inputErrMsg,
    hasInputErr,
    isSubmitting,
    setSubmitting,
    resetErrAndMsg,
    setErrorField,
  } = useFormFeature();

  const submitClickHandle = async () => {
    resetErrAndMsg();
    try {
      setSubmitting(true);
      await signIn({ email: inputValue.email, password: inputValue.password });
      setSubmitting(false);
      toast.success('Logged in successfully Yay !!');
      navigation('/dashboard');
    } catch (err) {
      setSubmitting(false);
      if (err instanceof AxiosError) {
        if (typeof err.response?.data.message === 'string') {
          setErrorField('email', err.response.data.message);
          setErrorField('password', err.response.data.message);
          return;
        }
        err.response?.data.message.forEach((error) => {
          const errorMessage = Object.values(error.constraints).join(' , ');
          const errField = error.property as FIELDS;
          setErrorField(errField, errorMessage);
        });
      } else {
        toast.error('something went wrong . please try again !!!');
      }
    }
  };

  return (
    <div className="authPageContainer">
      <div className="authPageFormContainer">
        <div className="mb-5">
          <HeaderTitle size={50} title="SIGN IN" />
          <Text>Track your spending Now !!!</Text>
        </div>
        <InputField
          onValueChange={(e) => {
            setInputValue((state) => ({ ...state, email: e.target.value }));
          }}
          placeholder="Enter email"
          value={inputValue.email}
          label="Email"
          error={hasInputErr.email}
          errorMessage={inputErrMsg.email}
        />
        <InputField
          onValueChange={(e) => {
            setInputValue((state) => ({ ...state, password: e.target.value }));
          }}
          placeholder="Enter password"
          value={inputValue.password}
          label="Password"
          error={hasInputErr.password}
          errorMessage={inputErrMsg.password}
        />
        <Button
          className="mt-3 mb-2"
          loading={isSubmitting}
          onClick={submitClickHandle}
        >
          Sign In
        </Button>
        <div>
          <Link to={'/signup'}>
            <Text>No Account ?</Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIN;
