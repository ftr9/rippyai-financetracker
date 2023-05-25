import React, { useEffect, useState } from 'react';
import { Button, Text } from '@tremor/react';
import InputField from '../Input/InputField';
import SelectField from '../Input/SelectField';
import HeaderTitle from '../typography/Header';
import { useMonthlyStore } from '../../store/useMonthlyStore';
import { useExpensesStore } from '../../store/useExpensesStore';
import { toast } from 'react-toastify';
import AmountSpentDisplay from '../display/AmountSpentDisplay';
import { AxiosError } from 'axios';

const AddExpensePopup = () => {
  const {
    data: { payload },
    fetchMonthlyPlan,
    isFetchingMonthlyPlan,
    updateRemainingExpense,
  } = useMonthlyStore();
  const { addExpenses } = useExpensesStore();
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [isSubmitting, setSubmitStatus] = useState(false);
  //const [] =
  useEffect(() => {
    const fetchMonthlyPlanDirect = async () => {
      await fetchMonthlyPlan();
    };
    if (!payload) {
      fetchMonthlyPlanDirect();
    }
  }, []);

  const resetFormState = () => {
    setCategory('');
    setExpenseAmount(0);
    setSubmitStatus(false);
  };

  const PopUpClickHandle = () => {
    setPopUpVisible(true);
  };

  const closePopUpHandler = () => {
    setPopUpVisible(false);
  };

  const addBtnSubmitHandle = async () => {
    if (!category) {
      toast.warning('Please select category !!!');
      return;
    }
    if (expenseAmount <= 0) {
      toast.warning('Expense amount cannot be less than 0');
      return;
    }
    try {
      setSubmitStatus(true);
      const addedExpenseData = await addExpenses({
        category: category,
        amount: expenseAmount,
      });
      updateRemainingExpense(addedExpenseData.remainingExpense);
      resetFormState();
      toast.success('Added expense successfully !!');
    } catch (err) {
      setSubmitStatus(false);
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
    }
  };

  return (
    <div>
      <Button color="red" onClick={PopUpClickHandle}>
        Add Expense
      </Button>
      {isPopUpVisible && (
        <div className="px-5 fixed top-0 left-0 z-50 h-screen w-screen bg-[rgba(28,126,214,0.5)] flex justify-center items-center">
          <div className="md:w-[600px] w-full  p-5 md:p-10  bg-white rounded-md">
            <div className="mb-5 flex flex-row justify-between items-center ">
              <HeaderTitle title="Add Expenses" size={24} />

              <Button
                disabled={isFetchingMonthlyPlan}
                onClick={closePopUpHandler}
                color="red"
              >
                Close
              </Button>
            </div>
            {!isFetchingMonthlyPlan && <AmountSpentDisplay />}
            <InputField
              label="Expense amount"
              value={`${expenseAmount}`}
              placeholder="Enter the expense amount"
              onValueChange={(e) => {
                const expenseAmount = parseInt(e.target.value);
                if (!expenseAmount) {
                  setExpenseAmount(0);
                  return;
                }
                if (!isNaN(expenseAmount)) {
                  setExpenseAmount(expenseAmount);
                }
              }}
            />
            <SelectField
              value={category}
              label="Select Category"
              options={payload?.categories ? payload.categories : []}
              onValueChanged={(value) => {
                setCategory(value);
              }}
            />
            <Button loading={isSubmitting} onClick={addBtnSubmitHandle}>
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExpensePopup;
