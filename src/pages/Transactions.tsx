import React, { useState } from 'react';

import { NavigationBar } from '../components/toolbars/NavigationBar';
import {
  TransactionListTopbar,
} from '../components/toolbars/TransactionListTopbar';
import { TransactionList } from '../components/transactions/TransactionList';
import { TransactionRequestParams } from '../features/api/types';

export const Transactions = () => {
  const [
    requestParams, setRequestParams,
  ] = useState<TransactionRequestParams>({});

  return (
    <>
      <TransactionListTopbar
        initialParams={requestParams}
        onUpdateParams={setRequestParams}
      />
      <TransactionList
        filters={requestParams}
        sx={{
          marginBottom: '50px',
        }}
      />
      <NavigationBar />
    </>
  );
};
