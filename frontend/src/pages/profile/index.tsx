import { Button, Badge, Divider } from '@tremor/react';
import AmountDisplayCard from '../../common/cards/AmountDisplayCard';
import HeaderTitle from '../../common/typography/Header';

import InputField from '../../common/Input/InputField';

const Profile = () => {
  return (
    <div className="max-w-[600px] mx-auto">
      <div className="mt-5 mb-8">
        <HeaderTitle title="Your Profile" size={24} />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <AmountDisplayCard title="Income" amount={45000} />
        <AmountDisplayCard title="Expense" amount={10000} />
        <AmountDisplayCard title="Investment" amount={200000} />
        <AmountDisplayCard title="Savings" amount={40000} />
      </div>

      <div>
        <div className="mt-5 mb-8">
          <div className="mt-10 mb-5">
            <HeaderTitle title="Your Monthly Plan" size={24} />
          </div>

          <InputField
            label="Monthly Salary"
            placeholder="Enter Your Monthly Salary"
            value=""
          />
          <InputField
            label="Expense Budget"
            placeholder="Enter your Expense Budget"
            value=""
          />
          <InputField
            label="Monthly Savings"
            placeholder="Enter Your Monthly Salary"
            value=""
          />
          <InputField
            label="Monthly Investment"
            placeholder="Enter Your Monthly Investment"
            value=""
          />
          <div>
            <InputField
              label="Categories"
              placeholder="Enter your category"
              value=""
            />
            <Button className="mb-5" color={'red'}>
              Add
            </Button>
            <div className="flex space-x-2 flex-wrap">
              <Badge size="md" color={'blue'}>
                Tiffin
              </Badge>
              <Badge size="md" color={'blue'}>
                Entertainment
              </Badge>
              <Badge size="md" color={'blue'}>
                Education
              </Badge>
              <Badge size="md" color={'blue'}>
                Children
              </Badge>
            </div>
          </div>
          <Button className="mt-10">Save new Monthly Plan</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
