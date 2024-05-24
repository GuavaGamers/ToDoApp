import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';
import { Container, Box, Button, Text } from '@chakra-ui/react';
import { colors } from './constants';
import './Auth.css';

const AuthPage = ({ handleLogin }) => {
  const [loginToggled, setLoginToggled] = useState(true);

  return (
    <div id="main-container">
      <Container
        maxW="lg"
        centerContent
        bg={colors.slateGray}
        p={6}
        borderRadius="md"
        id="auth-page-container"
      >
        <Box w="full" textAlign="center" mb={4}>
          {loginToggled ? (
            <>
              <Login handleLogin={handleLogin} />
              <Text mt={4}>
                Need an account?{' '}
                <Button variant="link" onClick={() => setLoginToggled(false)}>
                  Sign Up Here!
                </Button>
              </Text>
            </>
          ) : (
            <>
              <SignUp handleLogin={handleLogin} />
              <Text mt={4}>
                Already have an account?{' '}
                <Button variant="link" onClick={() => setLoginToggled(true)}>
                  Log in here!
                </Button>
              </Text>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default AuthPage;
