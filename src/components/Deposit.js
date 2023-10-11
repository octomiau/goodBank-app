import React from 'react';
import { UserContext, Card } from './context';
import { db, auth } from '../firebase'; 
import { push, set, ref, get } from 'firebase/database';


function Deposit(){
    const bgStyle = {
        backgroundImage: 'url(/BGbank-deposit.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    };

    const [show, setShow]         = React.useState(true);
    const [status, setStatus]     = React.useState('');
    const [deposit, setDeposit]         = React.useState('');
    const ctx = React.useContext(UserContext);
    const [depositError, setDepositError] = React.useState('');
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
    
  
    function validate(field, type) {
        if (!field && type === 'deposit') {
            setDepositError('Deposit is required.');
            return false;
        } else if (isNaN(field)) {
            setDepositError('Input should be a number.');
            return false;
        } else if (parseFloat(field) < 0) {
            setDepositError('Cannot deposit a negative amount.');
            return false;
        }
        return true;
    }
  
    function handleCreate() {
        if (auth.currentUser) {
            const userId = auth.currentUser.uid;
            const userRef = ref(db, 'users/' + userId + '/transactions');
            const newTransactionRef = push(userRef);
            
            set(newTransactionRef, {
                type: 'deposit',
                amount: parseFloat(deposit),
                date: new Date().toISOString()
            });
        
            const newBalance = balance + parseFloat(deposit);
            
            const balanceRef = ref(db, 'users/' + userId + '/balance');
            set(balanceRef, newBalance);
            
            setBalance(newBalance);
            setStatus(`Deposited ${deposit}. New Balance: ${newBalance}`);
            setDeposit('');
            setShow(false);
        } else {
            setStatus("User not logged in!");
        }

        
      
    }  
  
    function clearForm(){
        setShow(true);
    }
  
    return (
        <>
            <div className="maincontent">
                <div style={bgStyle}></div>
                    <Card
                        bgcolor="card border-dark mb-3"
                        header="Deposit"
                        txtcolor="black"
                        status={status}
                        body={(
                            <>
                            Balance: ${balance} <br /> {/* Display the balance */}
                            {show ? (
                                <>
                                <img src="depositCard.png" className="img-fluid" alt="Responsive image"/>
                                Deposit<br/>
                                <input type="input" className="form-control" id="deposit" placeholder="Enter amount" value={deposit} onChange={e => setDeposit(e.currentTarget.value)} /><br/>
                                {depositError && <div style={{ color: 'red' }}>{depositError}</div>}
                                <button type="submit" className="btn btn-outline-primary" onClick={handleCreate} disabled={!deposit}>Make Deposit</button>
                                </>
                            ):(
                                <>
                                <h5>Success</h5>
                                <img src="balanceCard.png" className="img-fluid" alt="Responsive image"/>
                                <button type="submit" className="btn btn-primary" onClick={clearForm}>Make another deposit</button>
                                </>
                                
                            )}
                            </>
                            
                        )}
                        />
            </div>
        </>
    )}

export default Deposit;