import React, { useState } from 'react';
import { Button } from '@tremor/react';
import InputField from '../Input/InputField';
import SelectField from '../Input/SelectField';
import HeaderTitle from '../typography/Header';

const AddExpensePopup = () => {
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const PopUpClickHandle = () => {
    setPopUpVisible(true);
  };

  const closePopUpHandler = () => {
    setPopUpVisible(false);
  };

  return (
    <div>
      <Button color="red" onClick={PopUpClickHandle}>
        Add Expense
      </Button>
      {isPopUpVisible && (
        <div className=" fixed top-0 left-0 z-50 h-screen w-screen bg-[rgba(28,126,214,0.5)] flex justify-center items-center">
          <div className="w-[600px] p-10  bg-white rounded-md">
            <div className="mb-5 flex flex-row justify-between items-center ">
              <HeaderTitle title="Add Expenses" size={24} />
              <Button onClick={closePopUpHandler} color="red">
                Close
              </Button>
            </div>
            <InputField
              label="Expense amount"
              value=""
              placeholder="Enter the expense amount"
            />
            <SelectField
              value=""
              label="Select Category"
              options={['grocery', 'entertainment', 'education', 'food']}
            />
            <Button>Add</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpensePopup;
