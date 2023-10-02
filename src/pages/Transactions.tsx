import React from 'react';

import { NavigationBar } from '../components/toolbars/NavigationBar';
import {
  TransactionListTopbar,
} from '../components/toolbars/TransactionListTopbar';
import { TransactionList } from '../components/transactions/TransactionList';

export const Transactions = () => {
  return (
    <>
      <TransactionListTopbar />
      <TransactionList
        filters={{}}
        sx={{
          marginBottom: '50px',
        }}
      />
      <NavigationBar />
    </>
  );
};
