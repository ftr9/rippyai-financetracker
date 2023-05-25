import React, { useEffect, useState } from 'react';

import HeaderTitle from '../../common/typography/Header';
import AddExpensePopup from '../../common/popup/AddExpensePopup';
import { useMonthlyStore } from '../../store/useMonthlyStore';
import { Button, Callout, BarChart, DonutChart } from '@tremor/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import MonthlyPlanDisplay from '../../common/display/MonthlyPlanDisplay';
import AmountSpentDisplay from '../../common/display/AmountSpentDisplay';
import { toast } from 'react-toastify';
import { useExpensesStore } from '../../store/useExpensesStore';

const Dashboard = () => {
  const {
    isFetchingMonthlyPlan,
    fetchMonthlyPlan,

    data: { payload, hasActiveMonthlyPlan },
  } = useMonthlyStore();

  useEffect(() => {
    const fetchMonthlyData = async () => {
      await fetchMonthlyPlan();
    };
    fetchMonthlyData();
  }, []);

  if (isFetchingMonthlyPlan) {
    return <div>Loading monthly plan hold on ...</div>;
  }

  if (payload === null && hasActiveMonthlyPlan === false) {
    return <Dashboard.CreatePlanAlert />;
  }

  return (
    <div>
      <Dashboard.MonthEndAlert />
      <div className="mt-5 mb-6 flex justify-between items-center">
        <HeaderTitle size={24} title="Your Monthly Breakdown" />
        <AddExpensePopup />
      </div>
      <MonthlyPlanDisplay />
      <AmountSpentDisplay />
      <Dashboard.BudgetUsuageDisplay />
    </div>
  );
};

const BudgetUsuageDisplay = () => {
  const { summarizedExpenses, fetchSummarizedExpense } = useExpensesStore();
  useEffect(() => {
    const fetchSummarizedCategory = async () => {
      await fetchSummarizedExpense();
    };
    fetchSummarizedCategory();
  }, []);
  return (
    <div>
      <div className="mt-3 mb-5">
        <HeaderTitle size={24} title="Budget Spending by category" />
      </div>

      <div className="mx-auto flex flex-col md:flex-row md:items-center">
        <BarChart
          className=" md:w-[50%]"
          data={summarizedExpenses}
          categories={['_sum.amount']}
          index="category"
          color="blue"
        />

        <DonutChart
          className="md:w-[50%]"
          variant={'pie'}
          data={summarizedExpenses}
          category="_sum.amount"
          index="category"
          color="blue"
        />
      </div>
    </div>
  );
};
Dashboard.BudgetUsuageDisplay = BudgetUsuageDisplay;

Dashboard.MonthEndAlert = () => {
  const {
    data: { payload },
    resetMonthlyPlan,
  } = useMonthlyStore();

  const [isReseting, setReseting] = useState(false);

  const onResetClickHandle = async () => {
    setReseting(true);
    try {
      await resetMonthlyPlan({
        id: payload?.id,
        income: payload?.income as unknown as number,
        savings: payload?.savings as unknown as number,
        investment: payload?.investment as unknown as number,
        expenseBudget: payload?.expenseBudget as unknown as number,
        categories: payload?.categories as unknown as string[],
      });
      toast.success('reset monthly plan successfully !!!');
    } catch (err) {
      toast.error('something went wrong !!!');
    } finally {
      setReseting(false);
    }
  };

  return (
    <>
      {new Date(payload?.createdAt as string).getMonth() <
        new Date().getMonth() && (
        <div>
          <Callout
            color="red"
            icon={ExclamationTriangleIcon}
            title="End Of the MOnth"
          >
            End of the month please click on start over button to reset your
            spendings.
          </Callout>
          <Button
            className="mt-2"
            loading={isReseting}
            onClick={onResetClickHandle}
            color="red"
          >
            start over
          </Button>
        </div>
      )}
    </>
  );
};

const CreatePlanAlert = () => {
  const navigation = useNavigate();
  const btnClickHandle = () => {
    navigation('/profile');
  };
  return (
    <>
      <Callout
        icon={ExclamationTriangleIcon}
        color="red"
        title="Please Setup your monthly plan "
      >
        In Order to track your expenses you must provide your
        income,expenseBudget,savings and Investment data.Please go to Profile
        page to add your monthly breakdown to continue using this application.
      </Callout>
      <Button onClick={btnClickHandle} className="mt-5" color="red">
        Go To Profile Page
      </Button>
    </>
  );
};
Dashboard.CreatePlanAlert = CreatePlanAlert;
export default Dashboard;
