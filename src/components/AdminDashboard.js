import React, { useEffect, useState } from 'react';
import { Card } from './context';
import AppMusic from './AppMusic';

function AdminDashboard() {
    // State to store all transactions fetched from the server
    const [transactions, setTransactions] = useState([]);
    // State to store the total value of all transactions
    const [total, setTotal] = useState(0);

    // Background styling for the component
    const bgStyle = {
        backgroundImage: 'url(/BG-admin.png)',
        backgroundSize: 'cover',
        backgroundColor: 'red',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    };

    // Effect hook to fetch all transactions from the server when the component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetching all transactions from the server API endpoint
                const response = await fetch('/api/all-transactions');
                const data = await response.json();

                // Updating the local state with the fetched data
                setTransactions(data.transactions);
                setTotal(data.total);
            } catch (error) {
                // Log any error during the fetch operation
                console.error('Error fetching all transactions:', error);
            }
        }

        // Invoke the fetchData function
        fetchData();
    }, []);

    return (
        <>
            <div className="audio-container">
                {/* Include the music component */}
                <AppMusic />
            </div>

            <div className="maincontent">
                <div style={bgStyle}></div>
                <div className="row">
                    <div className="col-md-6">
                        {/* Display a card showing a logo and title */}
                        <Card
                            txtcolor="black"
                            header={<img src="adminLogo.png" className="img-fluid" alt="Responsive image" />}
                            title="All Transactions"
                            body={<img src="adminCard.png" className="img-fluid" alt="All Data" />}
                        />
                    </div>
                    <div className="col-md-6 table-container">
                        <div className="table-responsive table-hover">
                            <table className="table borderless transparent-white-bg">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Total</th>
                                        <th>Transaction Type</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Iteratively render each transaction */}
                                    {transactions.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.userName}</td>
                                            <td>{transaction.total}</td>
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

export default AdminDashboard;
