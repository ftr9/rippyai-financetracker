import React from 'react';
import HeaderTitle from '../../common/typography/Header';
import SelectField from '../../common/Input/SelectField';
import InputField from '../../common/Input/InputField';
import { Button, Divider } from '@tremor/react';

const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const Reminder = () => {
  return (
    <div className="max-w-[600px] mx-auto">
      <div className="mb-3">
        <div className="mt-2 mb-5">
          <HeaderTitle title="Budget Reminder" size={24} />
        </div>

        <SelectField
          value="Remind after spending 70% of budget"
          label="Expense Budget Reminder Threshold"
          options={[
            'Remind after spending 40% of budget',
            'Remind after spending 50% of budget',
            'Remind after spending 60% of budget',
            'Remind after spending 70% of budget',
            'Remind after spending 80% of budget',
            'Remind after spending 90% of budget',
          ]}
        ></SelectField>
        <Button color="red">Set budget reminder</Button>
      </div>

      <Divider />

      <div className="mb-10">
        <div className="my-5">
          <HeaderTitle title="Loan Reminder" size={24} />
        </div>
        <InputField
          label="Amount"
          placeholder="Enter the Loan Amount to pay"
          value=""
        />
        <InputField label="Receiver" placeholder="Enter the receive" value="" />
        <InputField label="Purpose" placeholder="Enter Loan Purpose" value="" />
        <SelectField
          value="Remind every april"
          label="Set Loan Reminder per Month"
          options={MONTHS.map((month) => `Remind every ${month}`)}
        />
        <Button color="red">Set loan Reminder</Button>
      </div>
    </div>
  );
};

export default Reminder;
