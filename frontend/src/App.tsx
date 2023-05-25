import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './common/NavBar';

import { ToastContainer } from 'react-toastify';

import { AuthHoc } from './common/hoc/AuthHoc';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Expenses from './pages/expenses';
import Profile from './pages/profile';
import Reminder from './pages/reminder';
import SignIN from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

const Dashboardpage = AuthHoc(Dashboard);
const ExpensePage = AuthHoc(Expenses);
const ProfilePage = AuthHoc(Profile);
const ReminderPage = AuthHoc(Reminder);
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className=" px-2 md:px-10 xl:px-40">
        <div className="mx-auto max-w-[1200px]">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/signin" element={<SignIN />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/dashboard" element={<Dashboardpage />}></Route>
            <Route path="/expenses" element={<ExpensePage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/reminder" element={<ReminderPage />}></Route>
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
}

export default App;
