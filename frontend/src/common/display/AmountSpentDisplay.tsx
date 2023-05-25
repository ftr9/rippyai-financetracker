import React from 'react';
import { Card, Flex, Text, ProgressBar } from '@tremor/react';
import HeaderTitle from '../typography/Header';
import { useMonthlyStore } from '../../store/useMonthlyStore';

const AmountSpentDisplay = () => {
  const {
    data: { payload },
  } = useMonthlyStore();

  const spentPercentageAndAmountCalc = () => {
    if (payload?.remainingExpense && payload.expenseBudget) {
      return [
        (1 - payload?.remainingExpense / payload?.expenseBudget) * 100,
        payload.expenseBudget - payload.remainingExpense,
      ];
    }
    return [0, 0];
  };

  const [spentPercentage, spentAmount] = spentPercentageAndAmountCalc();

  return (
    <div className="my-8">
      <div className="mb-5">
        <HeaderTitle size={24} title="Your Spendings till now" />
      </div>
      <Card className="w-full">
        <Flex>
          <Text>
            {spentAmount} Rs &bull; {parseFloat(spentPercentage.toFixed(2))}%
            spent
          </Text>
          <Text>{payload?.expenseBudget} Rs</Text>
        </Flex>
        <ProgressBar
          percentageValue={spentPercentage}
          color="red"
          className="mt-3"
        />
      </Card>
    </div>
  );
};

export default AmountSpentDisplay;
