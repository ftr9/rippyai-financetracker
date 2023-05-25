import HomePageSectionOneImg from 'src/assets/homepage/hp-section-1.svg';
import { Button, Text } from '@tremor/react';
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[80vh] items-center py-[50px]">
      <div className=" md:w-[50%]">
        <Text className="text-black text-[36px] font-bold">
          TRACK TOUR EXPENSES
        </Text>
        <Text className="text-black text-[28px] font-semibold">
          STAY MOTIVATED
        </Text>
        <Text className="my-4">
          Add your income,expense, budget savings and investment data with ease.
          Add your daily expenses and visualize what portion of your budget is
          used.View monthly/weekly/daily expenditure list.
        </Text>
        <Button>Track My Expense</Button>
      </div>
      <div className="w-[80%] mx-auto md:mx-0 md:w-[50%]">
        <img src={HomePageSectionOneImg} alt="homepagesectionone" />
      </div>
    </div>
  );
};

export default Home;
