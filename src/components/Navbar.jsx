import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { getSignedInUserEmail, initClient, signInToGoogle, signOutFromGoogle } from "./GoogleApiService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    initClient((success) => {
      if (success) {
        getGoogleAuthorizedEmail();
      }
    });
  }, []);

  const getGoogleAuthorizedEmail = async () => {
    let email = await getSignedInUserEmail();
    console.warn("Synced EMAIL", email);

    if (email) {
      setIsLoggedIn(true);
      setUserEmail(email.gw);
    }
  };
  const getAuthToGoogle = async () => {
    let successfull = await signInToGoogle();
    if (successfull) {
      getGoogleAuthorizedEmail();
    }
  };
  const _signOutFromGoogle = () => {
    let status = signOutFromGoogle();
    if (status) {
      setIsLoggedIn(false);
      setUserEmail(null);
    }
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
            <button onClick={_signOutFromGoogle}>Sign Out</button>
          </div>
        ) : (
          <button onClick={getAuthToGoogle}>Sign In with Google</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;