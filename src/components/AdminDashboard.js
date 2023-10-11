import React, { useEffect, useState } from 'react';
import { Card } from './context';
import AppMusic from'./AppMusic';

function AdminDashboard() {
    const [transactions, setTransactions] = useState([]);
    const [total, setTotal] = useState(0);
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

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/all-transactions'); // Your API endpoint
                const data = await response.json();

                setTransactions(data.transactions);
                setTotal(data.total);
            } catch (error) {
                console.error('Error fetching all transactions:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="audio-container">
                <AppMusic />
            </div>



            <div className="maincontent">
                <div style={bgStyle}></div>
                <div className="row">
                    <div className="col-md-6">
                        <Card
                            txtcolor="black"
                            header={(<img src="adminLogo.png" className="img-fluid" alt="Responsive image"/>)}
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
