import React from 'react';
import { Text, Dropdown, DropdownItem } from '@tremor/react';

interface ISelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onValueChanged?: (value: string) => void;
}

const SelectField = ({
  label,
  options,
  value,
  onValueChanged,
}: ISelectFieldProps) => {
  return (
    <div className="mb-5">
      <Text className="mb-2">{label}</Text>
      <Dropdown onValueChange={onValueChanged} value={value}>
        {options.map((option) => (
          <DropdownItem key={option} value={option} title={option} />
        ))}
      </Dropdown>
    </div>
  );
};

export default SelectField;
