import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const AuthPage = ({ handleLogin }) => {
  const [loginToggled, setLoginToggled] = useState(true);
  return (
    <>
      {loginToggled ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <SignUp handleLogin={handleLogin} />
      )}

      {loginToggled ? (
        <>
          <span>Need an account? </span>
          <button onClick={() => setLoginToggled(false)}>Sign Up Here!</button>
        </>
      ) : (
        <>
          <span>Already have an account? </span>
          <button onClick={() => setLoginToggled(true)}>Log in here!</button>
        </>
      )}
    </>
  );
};

export default AuthPage;
