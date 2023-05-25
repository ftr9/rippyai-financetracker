import React from 'react';
import { useMonthlyStore } from '../../store/useMonthlyStore';
import AmountDisplayCard from '../cards/AmountDisplayCard';

const MonthlyPlanDisplay = () => {
  const {
    data: { payload },
  } = useMonthlyStore();
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
      <AmountDisplayCard title="Income" amount={payload?.income as number} />
      <AmountDisplayCard
        title="Expense Budget"
        amount={payload?.expenseBudget as number}
        topDecorationColor={'red'}
      />
      <AmountDisplayCard
        title="Savings"
        amount={payload?.savings as number}
        topDecorationColor={'green'}
      />
      <AmountDisplayCard
        title="Investment"
        amount={payload?.investment as number}
        topDecorationColor="green"
      />
    </div>
  );
};

export default MonthlyPlanDisplay;
