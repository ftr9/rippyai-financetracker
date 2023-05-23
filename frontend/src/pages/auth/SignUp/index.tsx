import React, { useState } from 'react';

import InputField from '../../../common/Input/InputField';
import { Button } from '@tremor/react';
import { useUserStore } from '../../../store/useUserStore';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import HeaderTitle from '../../../common/typography/Header';
import { Text } from '@tremor/react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormFeature } from '../hooks/useFormFeature';
import { FIELDS } from '../hooks/useFormFeature';

const SignUp = () => {
  const navigation = useNavigate();
  const { signUp } = useUserStore();

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
      await signUp(inputValue);
      toast.success(
        'Account created successfully. Please Login to continue !!!',
      );
      setSubmitting(false);
      navigation('/signin');
    } catch (err) {
      setSubmitting(false);
      if (err instanceof AxiosError) {
        if (typeof err.response?.data.message === 'string') {
          setErrorField('email', err.response.data.message);
          return;
        }
        err.response?.data.message.forEach((error) => {
          const errorMessage = Object.values(error.constraints).join(' , ');
          const errField = error.property as FIELDS;
          setErrorField(errField, errorMessage);
        });
      } else {
        toast.error('something went wrong please try again !');
      }
    }
  };

  return (
    <div className="authPageContainer">
      <div className="authPageFormContainer">
        <div className="mb-5">
          <HeaderTitle size={50} title="SIGN UP" />
          <Text>It's totally free go ahead and track your spending</Text>
        </div>
        <InputField
          onValueChange={(e) => {
            setInputValue((state) => ({ ...state, username: e.target.value }));
          }}
          placeholder="Enter username"
          value={inputValue.username}
          label="Username"
          error={hasInputErr.username}
          errorMessage={inputErrMsg.username}
        />
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
          Sign Up
        </Button>
        <div>
          <Link to={'/signin'}>
            <Text>Already have an account ?</Text>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
