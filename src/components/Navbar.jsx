import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSignIn = () => {
    // Code to handle Google sign-in
    // Once the user is signed in, update the state variables
    setIsLoggedIn(true);
    setUserEmail('example@gmail.com'); // Replace with the actual user's email
  };

  const handleSignOut = () => {
    // Code to handle sign out
    // Once the user is signed out, update the state variables
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <nav>
      <div className="logo">
        {/* Replace with your app logo */}
        <img src="/path/to/app-logo.png" alt="App Logo" />
      </div>
      <div className="right-section">
        {isLoggedIn ? (
          <div>
            <span>{userEmail}</span>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <button onClick={handleSignIn}>Sign In with Google</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;