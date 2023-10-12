// Importing necessary React hooks and Firebase functionalities
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Creating a context for user data that can be used throughout the application
export const UserContext = createContext();

// Component to provide user data to its children components
export const UserProvider = ({ children }) => {
    // Local state to store the current authenticated user
    const [currentUser, setCurrentUser] = useState(null);

    // Effect to set up an authentication state change listener
    useEffect(() => {
        // Listen for authentication state changes (login/logout)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // If a user is logged in, set the currentUser state
                setCurrentUser(user);
            } else {
                // If no user is logged in, set currentUser to null
                setCurrentUser(null);
            }
        });

        // Cleanup function to unsubscribe from the listener when the component is unmounted
        // This is to prevent memory leaks
        return unsubscribe;
    }, []); // Empty dependency array ensures this effect runs once when the component mounts

    // Using the UserContext.Provider to pass down the currentUser state to children components
    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};
