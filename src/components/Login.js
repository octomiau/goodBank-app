import React from 'react';
import { UserContext, Card } from './context';
import { auth, db } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { get, ref } from 'firebase/database';


function LogIn(){
    const bgStyle = {
        backgroundImage: 'url(/BGbank-login.png)',
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
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);
    const [nameError, setNameError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');
    const [name, setName] = React.useState('');

  
    function validate(field, type) {
        if (!field) {
            switch(type) {
                case 'email':
                    setEmailError('Email is required.');
                    break;
                case 'password':
                    setPasswordError('Password is required.');
                    break;
                default:
                    break;
            }
            return false;
        } else if (type === 'password' && field.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            alert('Password must be at least 8 characters long.');  // This line shows an alert to the user
            return false;
        }
        return true;
    }
    

    
    async function handleLogin() {
        setNameError('');
        setPasswordError('');
        if (!validate(email, 'name') || !validate(password, 'password')) return;
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
    
            // Fetch name from Firebase using the UID
            const userRef = ref(db, 'users/' + uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                const userData = snapshot.val();
                // Store name in state or context to display later
                setName(userData.name); 
            }
    
            setShow(false);
            setStatus(`Logged in successfully as!`);
        } catch (error) {
            setStatus(error.message);
        }
    }  
    
    

    async function handleGoogleLogin() {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
    
            if (result.additionalUserInfo?.isNewUser) {
                setStatus("User created successfully!");
            } else {
                setStatus("Logged in successfully with google!");
            }
        } catch (error) {
            console.error("Error during Google login", error);
            setStatus("Error during login: " + error.message);
        }
    }

    function clearForm() {
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return (
        <>
            <div className="maincontent">
                <div className="maincontent">
                    <div style={bgStyle}></div>
                    <Card
                        bgcolor="card border-dark mb-3"
                        header="Log In"
                        txtcolor="black"
                        status={status}
                        body={show ? (
                            <>
                                 Email address<br/>
                                <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                                Password<br />
                                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
                                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                                <button type="submit" className="btn btn-outline-secondary" onClick={handleLogin}>Log In</button>
                                <button type="button" className="btn btn-outline-primary" onClick={handleGoogleLogin}><i className="fab fa-google"></i>  Log In with Google</button>
                            </>
                        ) : (
                            <>
                                <h5>Welcome back {name}!</h5>
                                <button type="submit" className="btn btn-primary" onClick={clearForm}>Change to another account</button>
                            </>
                        )}
                    />
                </div>
            </div>
        </>
    );
}
    
export default LogIn;
    