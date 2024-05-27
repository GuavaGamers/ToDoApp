import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import CommonHeader from './CommonHeader';
import { colors } from './constants';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import './Auth.css';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    try {
      const response = await axios.post('/api/auth/login', body);
      console.log('Login successful', response.data);
      handleLogin(response.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Box p={4} bg={colors.silver} borderRadius="md" boxShadow="md">
      <CommonHeader text="Log In" size="30pt" color={colors.slateGray} />
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel color={colors.slateGray}>Email: </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <EmailIcon color={colors.raisin} />
            </InputLeftElement>
            <Input
              borderColor={colors.slateGray}
              focusBorderColor={colors.powderBlue}
              color={colors.raisin}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel color={colors.slateGray}>Password: </FormLabel>
          <InputGroup>
            <InputLeftElement>
              <LockIcon color={colors.raisin} />
            </InputLeftElement>
            <Input
              borderColor={colors.slateGray}
              focusBorderColor={colors.powderBlue}
              color={colors.raisin}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          color={colors.raisin}
          backgroundColor={colors.powderBlue}
          w="full"
        >
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default Login;
