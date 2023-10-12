// Import necessary React modules and components
import React, { useContext } from 'react';
import { UserContext } from './UserContext'; // Context to get the current user's data
import Profile from './Profile'; // Component to show user's profile details
import AppMusic from './AppMusic'; // Component to provide music functionality

// NavBar component to render the navigation bar of the application
function NavBar() {
    // Retrieve the current user data from the UserContext
    const currentUser = useContext(UserContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                

                <a className="navbar-brand" href="#" title="Go to Bad Bank´s home">
                <img src="goodBankLogo.png" alt="Bad Bank Logo" width="150" height="auto" className="d-inline-block align-top" />
                </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#/CreateAccount/" title="Create an account">Create Account</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/login/" title="Login into your account">Login</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/deposit/" title="Make a deposit">Deposit</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/withdraw/" title="Make a withdrawal">Withdraw</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#/alldata/" title="View transactions">All transactions</a>
                            </li>
                        </ul>
                    </div>
                    <AppMusic />

                    {currentUser && <Profile user={currentUser} />}
                </div>
            </nav>
        </>
    );
}

export default NavBar;
