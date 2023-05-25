import React, { useEffect, useState } from 'react';
import { Button, Badge, Text } from '@tremor/react';
import AmountDisplayCard from '../../common/cards/AmountDisplayCard';
import HeaderTitle from '../../common/typography/Header';

import InputField from '../../common/Input/InputField';
import { useMonthlyStore } from '../../store/useMonthlyStore';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import MonthlyPlanDisplay from '../../common/display/MonthlyPlanDisplay';

type FIELDS =
  | 'income'
  | 'expenseBudget'
  | 'savings'
  | 'investment'
  | 'category';

const DEFAULT_INPUT_ERR = {
  income: '',
  expenseBudget: '',
  savings: '',
  investment: '',
  category: '',
};
const DEFAULT_INPUT_ERR_STATUS = {
  income: false,
  expenseBudget: false,
  savings: false,
  investment: false,
  category: false,
};
const Profile = () => {
  const navigate = useNavigate();
  const {
    saveMonthlyPlan,
    updateMonthlyPlan,
    data: { hasActiveMonthlyPlan, payload },
  } = useMonthlyStore();

  const [numberInputValue, setNumberInputValue] = useState({
    income: payload ? payload.income : 0,
    expenseBudget: payload ? payload.expenseBudget : 0,
    savings: payload ? payload.savings : 0,
    investment: payload ? payload.investment : 0,
  });
  const [knownInputErr, setKnownInputErr] = useState(DEFAULT_INPUT_ERR);
  const [hasKnownInputErr, setHasKnownInputErr] = useState(
    DEFAULT_INPUT_ERR_STATUS,
  );
  const [otherInputError, setOtherInputError] = useState({
    status: false,
    message: '',
  });

  const [categoryValue, setCategoryValue] = useState('');
  const [categoriesList, setCategoriesList] = useState(
    payload ? payload.categories : [],
  );

  const [isSavingMonthlyData, setSavingMonthlyData] = useState(false);

  useEffect(() => {
    if (hasActiveMonthlyPlan === null) {
      navigate('/dashboard');
    }
  }, []);

  const parseValueAndStore = (value: string, field: FIELDS) => {
    const inputVal = parseInt(value);
    if (!isNaN(inputVal)) {
      setNumberInputValue((state) => ({ ...state, [field]: inputVal }));
    } else {
      setNumberInputValue((state) => ({ ...state, [field]: 0 }));
    }
  };

  const setErrorField = (field: FIELDS, message: string) => {
    setKnownInputErr((state) => ({ ...state, [field]: message }));
    setHasKnownInputErr((state) => ({ ...state, [field]: true }));
  };

  const addClickHandle = () => {
    if (categoryValue) {
      const uniqueCategories = [...new Set([...categoriesList, categoryValue])];
      setCategoriesList(uniqueCategories);
      setCategoryValue('');
    }
  };

  const resetErrFields = () => {
    setKnownInputErr(DEFAULT_INPUT_ERR);
    setHasKnownInputErr(DEFAULT_INPUT_ERR_STATUS);
    setOtherInputError({ status: false, message: '' });
  };

  const saveMonthlyPlanHandle = async () => {
    resetErrFields();
    if (categoriesList.length === 0) {
      setErrorField('category', 'please add at atleat one category');
      toast.warn('please check your input again !!!');
      return;
    }
    if (numberInputValue.income <= 0) {
      setErrorField('income', 'income must be more than 0');
      toast.warn('please check your input again !!!');
      return;
    }
    try {
      setSavingMonthlyData(true);
      if (hasActiveMonthlyPlan && payload) {
        await updateMonthlyPlan({
          id: payload.id,
          ...numberInputValue,
          categories: categoriesList,
        });
      } else {
        await saveMonthlyPlan({
          ...numberInputValue,
          categories: categoriesList,
        });
      }

      setSavingMonthlyData(false);
      toast.success('added new monthly plan successfully !!!');
    } catch (err) {
      setSavingMonthlyData(false);
      if (err instanceof AxiosError) {
        if (typeof err.response?.data.message === 'string') {
          setOtherInputError({
            status: true,
            message: err.response.data.message,
          });
          toast.warn('please check your input again !!!');
          return;
        }
        err.response?.data.message.forEach((error) => {
          setErrorField(
            error.property,
            Object.values(error.constraints)[0] as string,
          );
        });
        toast.warn('please check your input again !!!');
      }
    }
  };

  return (
    <div className="max-w-[600px] mx-auto">
      <div>
        <div className="mt-5 mb-8">
          {hasActiveMonthlyPlan && <MonthlyPlanDisplay />}
          <div className="mt-10 mb-5">
            <HeaderTitle title="Your Monthly Plan" size={24} />
          </div>

          <div>
            {otherInputError.status && (
              <Text className="font-bold mb-3" color={'red'}>
                * {otherInputError.message}
              </Text>
            )}
          </div>
          <InputField
            label="Monthly Salary"
            placeholder="Enter Your Monthly Salary"
            value={`${numberInputValue.income}`}
            onValueChange={(e) => {
              parseValueAndStore(e.target.value, 'income');
            }}
            error={hasKnownInputErr.income}
            errorMessage={knownInputErr.income}
          />
          <InputField
            label="Expense Budget"
            placeholder="Enter your Expense Budget"
            value={`${numberInputValue.expenseBudget}`}
            onValueChange={(e) => {
              parseValueAndStore(e.target.value, 'expenseBudget');
            }}
            error={hasKnownInputErr.expenseBudget}
            errorMessage={knownInputErr.expenseBudget}
          />
          <InputField
            label="Monthly Savings"
            placeholder="Enter Your Monthly Savings"
            value={`${numberInputValue.savings}`}
            onValueChange={(e) => {
              parseValueAndStore(e.target.value, 'savings');
            }}
            error={hasKnownInputErr.savings}
            errorMessage={knownInputErr.savings}
          />
          <InputField
            label="Monthly Investment"
            placeholder="Enter Your Monthly Investment"
            value={`${numberInputValue.investment}`}
            onValueChange={(e) => {
              parseValueAndStore(e.target.value, 'investment');
            }}
            error={hasKnownInputErr.investment}
            errorMessage={knownInputErr.investment}
          />
          <div>
            <InputField
              label="Categories"
              placeholder="Enter your category"
              value={categoryValue}
              onValueChange={(e) => {
                setCategoryValue(e.target.value);
              }}
              error={hasKnownInputErr.category}
              errorMessage={knownInputErr.category}
            />
            <Button onClick={addClickHandle} className="mb-5" color={'red'}>
              Add
            </Button>
            <div className="flex space-x-2 flex-wrap">
              {categoriesList.map((category) => (
                <Badge color="red" key={category}>
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <Button
            loading={isSavingMonthlyData}
            className="mt-10"
            onClick={saveMonthlyPlanHandle}
          >
            Save new Monthly Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
