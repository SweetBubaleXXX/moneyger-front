import {
  Box,
  IconButton,
  Typography,
} from '@mui/joy';
import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  TransactionForm,
} from '../components/transactions/TransactionForm';

export const AddTransaction = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        minHeight="100vh"
      >
        <Box
          display="flex"
          maxWidth="md"
          p={2}
          mx="auto"
        >
          <IconButton onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
          <Typography
            level="h3"
            textAlign="center"
          >
            Add Transaction
          </Typography>
        </Box>
        <Box
          minWidth={230}
          maxWidth={300}
          marginX="auto"
        >
          <TransactionForm />
        </Box>
      </Box>
    </>
  );
};
