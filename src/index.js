import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
import { UserContext } from './components/context';

import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import AllData from './components/AllData';
import AdminDashboard from './components/AdminDashboard';


import { UserProvider } from './components/UserContext';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './index.css';

function SpaContent() {
  const location = useLocation();

  return (
    <div className="holygrail-grid">
      {location.pathname !== "/AdminDashboard" && 
        <div className="header">
          <NavBar />
        </div>
      }

      <UserContext.Provider
        value={{ users: [{ name: 'name', email: 'email', password: 'secret', balance: 100 }] }}
      >
        <div className="container maincontent" style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreateAccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/alldata" element={<AllData />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </UserContext.Provider>
      
      <div className="left-sidebar"></div>
      <div className="right-sidebar"></div>
      <div className="footer"></div>
    </div>
  );
}


function Spa() {
  return (
    <HashRouter>
      <SpaContent />
    </HashRouter>
  );
}


const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <UserProvider>
    <Spa />
  </UserProvider>
);
export default Spa; 
