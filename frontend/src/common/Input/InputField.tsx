import { TextInput, Text } from '@tremor/react';
import React from 'react';

interface IInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
}

const InputField = ({ label, placeholder, value }: IInputFieldProps) => {
  return (
    <div className="mb-5">
      <Text className="mb-2">{label}</Text>
      <TextInput value={value} placeholder={placeholder} />
    </div>
  );
};

export default InputField;
