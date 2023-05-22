import React from 'react';
import { Button, Text } from '@tremor/react';
import TransparentLogoImg from 'src/assets/TransparentLogo.png';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <img className="h-[100px]" src={TransparentLogoImg} alt="main Logo" />
      <ul className="flex flex-row list-none space-x-8 items-center">
        <li>
          <Link to={'/'}>
            <Text> Home</Text>
          </Link>
        </li>
        <li>
          <Link to={'/dashboard'}>
            <Text>Dashboard</Text>
          </Link>
        </li>
        <li>
          <Link to={'/expenses'}>
            <Text>Expenses</Text>
          </Link>
        </li>
        <li>
          <Link to={'/profile'}>
            <Text>Profile</Text>
          </Link>
        </li>
        <li>
          <Link to={'/reminder'}>
            <Text>Reminder</Text>
          </Link>
        </li>
        <li>
          <Button>Sign In</Button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
