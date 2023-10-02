import React from 'react';

import { NavigationBar } from '../components/toolbars/NavigationBar';
import {
  TransactionListTopbar,
} from '../components/toolbars/TransactionListTopbar';
import { TransactionList } from '../components/transactions/TransactionList';

export const Transactions = () => {
  return (
    <>
      <TransactionListTopbar
        params={{}}
        onUpdateParams={() => { }}
      />
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
