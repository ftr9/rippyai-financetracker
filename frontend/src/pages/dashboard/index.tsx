import AmountDisplayCard from '../../common/cards/AmountDisplayCard';
import HeaderTitle from '../../common/typography/Header';

const Dashboard = () => {
  return (
    <div>
      <div className="mt-5 mb-8">
        <HeaderTitle size={24} title="Your Monthly Breakdown" />
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-5">
        <AmountDisplayCard title="Income" amount={45000} />
        <AmountDisplayCard
          title="Expense Budget"
          amount={15000}
          topDecorationColor={'red'}
        />
        <AmountDisplayCard
          title="Savings"
          amount={20000}
          topDecorationColor={'green'}
        />
        <AmountDisplayCard
          title="Investment"
          amount={10000}
          topDecorationColor="green"
        />
      </div>
    </div>
  );
};

export default Dashboard;
