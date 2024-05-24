import React from 'react';
import { Heading } from '@chakra-ui/react';

const CommonHeader = ({ text, size, color }) => {
  return (
    <p style={{ fontSize: size, color: color, fontWeight: 'bold' }}>{text}</p>
  );
};

export default CommonHeader;
