import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase'; 
import { Card } from './context';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

function AllData() {
    // State to hold all user transactions
    const [transactions, setTransactions] = useState([]);
    // State to hold the total user balance
    const [total, setTotal] = useState(0);

    // Background styling for the component
    const bgStyle = {
        backgroundImage: 'url(/BGbank-alldata.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    };

    // Effect hook to load user's transaction data from Firebase
    useEffect(() => {
        // Check if a user is logged in
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            // Reference to user's transactions in Firebase
            const userRef = ref(db, 'users/' + userId + '/transactions');

            // Listen for changes in the user's transaction data
            onValue(userRef, (snapshot) => {
                const fbTransactions = snapshot.val() || {};
                // Convert transactions object to an array for easier rendering
                const transactionsList = Object.keys(fbTransactions).map(key => {
                    return { id: key, ...fbTransactions[key] };
                });

                // Calculate the total balance from all transactions
                const totalBalance = transactionsList.reduce((acc, transaction) => {
                    if (transaction.type === 'deposit') {
                        return acc + parseFloat(transaction.amount);
                    } else if (transaction.type === 'withdraw') {
                        return acc - parseFloat(transaction.amount);
                    }
                    return acc;
                }, 0);
                
                // Update local state with fetched data
                setTotal(totalBalance);
                setTransactions(transactionsList);
            });
        }
    }, []);

    return (
        <>
            <div className="maincontent">
                <div style={bgStyle}></div>
                <div className="row">
                    <div className="col-md-6">
                        <Card
                            txtcolor="black"
                            header="Good Bank"
                            title="Your transactions!"
                            text=""
                            body={<img src="alldataCard.png" className="img-fluid" alt="Responsive image" />}
                        />
                        {/* If user is authenticated, show a button linking to an external app */}
                        {auth.currentUser && (
                            <a href="https://sea-lion-app-wriat.ondigitalocean.app/" target="_blank" rel="noopener noreferrer">
                                <button className="custom-button">
                                    <img src="push.png" className="img-fluid" alt="Button" />
                                </button> 
                            </a>
                        )}
                    </div>
                    <div className="col-md-6">
                        <div className="table-responsive table-hover">
                            <table className="table borderless transparent-white-bg">
                                <thead>
                                    <tr>
                                        <th>Total</th>
                                        <th>Transaction Type</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <div>
                                    {/* Display the total balance */}
                                    <h4>${total}</h4>
                                </div>
                                <tbody>
                                    {/* Iterate through transactions and render each one */}
                                    {transactions.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td>{auth.currentUser && auth.currentUser.displayName}</td>
                                            <td>{transaction.type}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{new Date(transaction.date).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllData;
