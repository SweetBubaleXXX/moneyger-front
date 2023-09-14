import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, 
  Grid,
  IconButton,
  Typography,
} from '@mui/joy';
import {
  TransactionCreateForm, 
} from '../components/transactions/TransactionCreateForm';
import { ChevronLeft } from 'lucide-react';

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
          <TransactionCreateForm />
        </Box>
      </Box>
    </>
  );
};
