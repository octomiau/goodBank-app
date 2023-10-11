import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { signOut } from 'firebase/auth';
import { get, ref } from 'firebase/database';

function Profile({ user }) {
    const [displayName, setDisplayName] = useState(user.displayName); // start with whatever the auth gives us

    useEffect(() => {
        if (!user.displayName && user.uid) {
            // Fetch name from Firebase using the UID
            const userRef = ref(db, 'users/' + user.uid);
            get(userRef).then(snapshot => {
                if (snapshot.exists()) {
                    setDisplayName(snapshot.val().name);
                }
            });
        }
    }, [user]);

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Refresh the page
            window.location.reload();
            console.log("Logged out successfully");
        }).catch((error) => {
            console.error("Error logging out:", error);
        });
    };

    return (
        <div className="btn-group">
            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Welcome, {displayName}
            </button>
            <div className="dropdown-menu">
                <a className="dropdown-item">Name: {displayName}</a>
                <a className="dropdown-item">Email: {user.email}</a>
                <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
            </div>
        </div>
    );
}

export default Profile;
