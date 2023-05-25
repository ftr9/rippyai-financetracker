import { TextInput, Text } from '@tremor/react';
import React from 'react';

interface IInputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  type?: 'password' | 'text' | undefined;
}

const InputField = ({
  label,
  placeholder,
  value,
  onValueChange,
  error,
  type,
  errorMessage,
}: IInputFieldProps) => {
  return (
    <div className="mb-3">
      <Text className="mb-1">{label}</Text>
      <TextInput
        type={type}
        onChange={onValueChange}
        value={value}
        placeholder={placeholder}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default InputField;
