import { Text, Dropdown, DropdownItem } from '@tremor/react';

interface ISelectFieldProps {
  label: string;
  options: string[];
  value: string;
}

const SelectField = ({ label, options, value }: ISelectFieldProps) => {
  return (
    <div className="mb-5">
      <Text className="mb-2">{label}</Text>
      <Dropdown value={value}>
        {options.map((option) => (
          <DropdownItem value={option} title={option} />
        ))}
      </Dropdown>
    </div>
  );
};

export default SelectField;
