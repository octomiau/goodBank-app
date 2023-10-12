// Importing necessary React hooks and Firebase functionalities
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { signOut } from 'firebase/auth';
import { get, ref } from 'firebase/database';

// Profile component that takes a user prop
function Profile({ user }) {
    // Local state to store the display name of the user
    const [displayName, setDisplayName] = useState(user.displayName); // Initialize with the name from authentication

    // Effect to fetch user's display name if not provided by authentication
    useEffect(() => {
        if (!user.displayName && user.uid) {
            // Construct a reference to the user's data in Firebase using UID
            const userRef = ref(db, 'users/' + user.uid);
            
            // Fetch the data from Firebase and update the display name if it exists
            get(userRef).then(snapshot => {
                if (snapshot.exists()) {
                    setDisplayName(snapshot.val().name);
                }
            });
        }
    }, [user]); // Re-run this effect whenever the user prop changes

    // Function to handle user logout
    const handleLogout = () => {
        // Use Firebase's signOut method to log the user out
        signOut(auth).then(() => {
            // Once logged out, refresh the page to prevent the users data to display
            window.location.reload();
            console.log("Logged out successfully");
        }).catch((error) => {
            console.error("Error logging out:", error);
        });
    };

    return (
        // Dropdown button displaying user's display name
        <div className="btn-group">
            <button type="button" className="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Welcome, {displayName}
            </button>
            <div className="dropdown-menu">
                {/* Dropdown items displaying user's information and logout option */}
                <a className="dropdown-item">Name: {displayName}</a>
                <a className="dropdown-item">Email: {user.email}</a>
                <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
            </div>
        </div>
    );
}

export default Profile;
