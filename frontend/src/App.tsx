import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Expenses from './pages/expenses';
import Profile from './pages/profile';
import Reminder from './pages/reminder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/expenses" element={<Expenses />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/reminder" element={<Reminder />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
