import React from 'react';
import { Box } from '@mui/joy';
import {
  TransactionCreateForm, 
} from '../components/transactions/TransactionCreateForm';

export const AddTransaction = () => {
  return (
    <Box 
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
      minWidth={230}
      maxWidth={300}
      marginX="auto"
    >
      <TransactionCreateForm/>
    </Box>
  );
};
