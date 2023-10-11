import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        return unsubscribe; // Unsubscribe to avoid memory leaks
    }, []);

    return (
        <UserContext.Provider value={currentUser}>
            {children}
        </UserContext.Provider>
    );
};

