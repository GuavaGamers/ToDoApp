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
import { colors } from './constants';
import CommonHeader from './CommonHeader';
import { EmailIcon, LockIcon, StarIcon } from '@chakra-ui/icons';

const SignUp = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
      username,
    };

    try {
      const response = await axios.post('/api/auth/signup', body);
      console.log('signup successful', response.data);
      // login after sign up is successful
      handleLogin(response.data);
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <Box p={4} bg={colors.silver} borderRadius="md" boxShadow="md">
      <CommonHeader text="Sign Up" color={colors.slateGray} size="30pt" />
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb={4}>
          <FormLabel color={colors.slateGray}>Email</FormLabel>
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
          <FormLabel color={colors.slateGray}>Password</FormLabel>
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
        <FormControl id="username" mb={4}>
          <FormLabel color={colors.slateGray}>Username</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <StarIcon color={colors.raisin} />
            </InputLeftElement>
            <Input
              borderColor={colors.slateGray}
              focusBorderColor={colors.powderBlue}
              color={colors.raisin}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
