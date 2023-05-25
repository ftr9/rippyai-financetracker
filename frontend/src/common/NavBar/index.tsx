import React, { useState } from 'react';
import { Button, Text } from '@tremor/react';
//@ts-ignore
import TransparentLogoImg from 'src/assets/TransparentLogo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUserStore } from '../../store/useUserStore';
import { toast } from 'react-toastify';
import { Bars4Icon } from '@heroicons/react/24/solid';

const NavBar = () => {
  const [isMenuOpen, setMenuToggle] = useState(false);
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <img className="h-[100px]" src={TransparentLogoImg} alt="main Logo" />
        <ul className="hidden md:flex flex-row list-none space-x-8 items-center">
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
            <NavBar.CtaBtn />
          </li>
        </ul>
        <Button
          className="md:hidden"
          onClick={() => {
            setMenuToggle(!isMenuOpen);
          }}
          icon={Bars4Icon}
        />
        {/**
         * for mobile screen
         */}
      </div>
      <div className="md:hidden">
        <ul
          className={`space-y-4 overflow-hidden ${
            isMenuOpen ? 'h-[230px]' : 'h-[0px]'
          } transition-all duration-200 ease-in px-3`}
        >
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
            <NavBar.CtaBtn />
          </li>
        </ul>
      </div>
    </>
  );
};

const CtaBtn = () => {
  const { logout } = useUserStore();
  const navigation = useNavigate();
  const signUpPressHandle = () => {
    navigation('/signup');
  };
  const signInPressHandle = () => {
    navigation('/signin');
  };
  const signOutPressHandle = async () => {
    await logout();
    toast.success('Logged Out Successfully !!!');
    navigation('/signin');
  };
  const location = useLocation();
  if (location.pathname === '/signup') {
    return <Button onClick={signInPressHandle}>Sign In</Button>;
  } else if (location.pathname === '/signin') {
    return <Button onClick={signUpPressHandle}>Sign Up</Button>;
  } else if (location.pathname === '/') {
    return <Button onClick={signUpPressHandle}>Sign Up</Button>;
  } else {
    return <Button onClick={signOutPressHandle}>Sign Out</Button>;
  }
};

NavBar.CtaBtn = CtaBtn;

export default NavBar;
