// Import necessary React and related modules
import React from 'react';
import ReactDOM from 'react-dom';

// Importing components for the SPA (Single Page Application)
import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import AllData from './components/AllData';
import AdminDashboard from './components/AdminDashboard';

// Importing UserContext for managing user data and state
import { UserContext, UserProvider } from './components/UserContext';

// Importing routing related modules
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// Importing global CSS styles
import './index.css';

// Component to define the content of the Single Page Application
function SpaContent() {
  // Get the current URL path to conditionally render the NavBar
  const location = useLocation();

  return (
    <div className="holygrail-grid">
      {/* Render NavBar for all paths except /AdminDashboard */}
      {location.pathname !== "/AdminDashboard" && 
        <div className="header">
          <NavBar />
        </div>
      }

      {/* Provide a context for the user data */}
      <UserContext.Provider
        value={{ users: [{ name: 'name', email: 'email', password: 'secret', balance: 100 }] }}
      >
        <div className="container maincontent" style={{ padding: "20px" }}>
          {/* Define application routes and their corresponding components */}
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
      
      {/* Basic layout elements for the application */}
      <div className="left-sidebar"></div>
      <div className="right-sidebar"></div>
      <div className="footer"></div>
    </div>
  );
}

// Main SPA component wrapped with routing functionality
function Spa() {
  return (
    <HashRouter>
      <SpaContent />
    </HashRouter>
  );
}

// Get the root DOM element and render the entire SPA within UserProvider context
const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <UserProvider>
    <Spa />
  </UserProvider>
);

export default Spa; 
