import React, { useEffect } from 'react';

import HeaderTitle from '../../common/typography/Header';
import AddExpensePopup from '../../common/popup/AddExpensePopup';
import { useMonthlyStore } from '../../store/useMonthlyStore';
import { Button, Callout, ProgressBar, Card, Flex, Text } from '@tremor/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import MonthlyPlanDisplay from '../../common/display/MonthlyPlanDisplay';
import AmountSpentDisplay from '../../common/display/AmountSpentDisplay';

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
      <div className="mt-5 mb-8 flex justify-between items-center">
        <HeaderTitle size={24} title="Your Monthly Breakdown" />
        <AddExpensePopup />
      </div>
      <MonthlyPlanDisplay />
      <AmountSpentDisplay />
    </div>
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
