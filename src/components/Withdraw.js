import React from 'react';
import { UserContext, Card } from './context';
import { db, auth } from '../firebase'; 
import { ref, get, set, push } from 'firebase/database';

function Withdraw(){
    const bgStyle = {
        backgroundImage: 'url(/BGbank-withdraw.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    };
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [withdraw, setWithdraw] = React.useState('');
    const [withdrawError, setWithdrawError] = React.useState('');
    const [balance, setBalance] = React.useState(0);

    React.useEffect(() => {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const balanceRef = ref(db, 'users/' + userId + '/balance');
            get(balanceRef).then(snapshot => {
                if (snapshot.exists()) {
                    setBalance(snapshot.val());
                }
            });
        }
    }, []);

    function validate(field) {
        if (!field) {
            setWithdrawError('Withdrawal is required.');
            return false;
        } else if (isNaN(field)) {
            setWithdrawError('Input should be a number.');
            return false;
        } else if (parseFloat(field) > balance) {
            setWithdrawError('Insufficient funds.');
            return false;
        }
        return true;
    }

    function handleWithdraw() {
        if (!validate(withdraw)) return;
    
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const newBalance = balance - parseFloat(withdraw);
    
            // Save the withdrawal as a transaction
            const userRef = ref(db, 'users/' + userId + '/transactions');
            const newTransactionRef = push(userRef);
            set(newTransactionRef, {
                type: 'withdraw',
                amount: parseFloat(withdraw),
                date: new Date().toISOString()
            });
            
            // Update the balance in Firebase
            const balanceRef = ref(db, 'users/' + userId + '/balance');
            set(balanceRef, newBalance);
            
            // Update the state
            setBalance(newBalance);
            setStatus(`Withdrew ${withdraw}. New Balance: ${newBalance}`);
            setWithdraw('');
            setShow(false);
        } else {
            setStatus("User not logged in!");
        }
    }
    

    function clearForm() {
        setWithdraw('');
        setShow(true);
    }
  
    return (
        <>
            <div className="maincontent">
                <div style={bgStyle}></div>
                    <Card
                        bgcolor="card border-dark mb-3"
                        header="Withdraw"
                        txtcolor="black"
                        status={status}
                        body={(
                            <>
                            Balance: ${balance} <br /> {/* Display the balance */}
                            {show ? (
                                <>
                                <img src="withdrawCard.png" className="img-fluid" alt="Responsive image"/>
                                Withdraw<br/>
                                <input type="input" className="form-control" id="withdraw" placeholder="Enter amount" value={withdraw} onChange={e => setWithdraw(e.currentTarget.value)} /><br/>
                                {withdrawError && <div style={{ color: 'red' }}>{withdrawError}</div>}
                                <button type="submit" className="btn btn-outline-primary" onClick={handleWithdraw} disabled={!withdraw}>Make withdraw</button>

                                </>
                            ):(
                                <>
                                <h5>Success</h5>
                                <img src="balanceCard2.png" className="img-fluid" alt="Responsive image"/>
                                <button type="submit" className="btn btn-primary" onClick={clearForm}>Make another withdraw opperation</button>
                                </>
                                
                            )}
                            </>
                            
                        )}
                        />
            </div>
        </>
    )}

export default Withdraw;