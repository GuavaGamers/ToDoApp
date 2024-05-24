import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Container } from '@chakra-ui/react';
import { colors } from './colorConfig';

const AuthPage = ({ handleLogin }) => {
  const [loginToggled, setLoginToggled] = useState(true);
  return (
    <Container centerContent backgroundColor={colors.blue}>
      {loginToggled ? (
        <>
          <Login handleLogin={handleLogin} />
          <span>Need an account? </span>
          <button onClick={() => setLoginToggled(false)}>Sign Up Here!</button>
        </>
      ) : (
        <>
          <SignUp handleLogin={handleLogin} />
          <span>Already have an account? </span>
          <button onClick={() => setLoginToggled(true)}>Log in here!</button>
        </>
      )}
    </Container>
  );
};

export default AuthPage;
