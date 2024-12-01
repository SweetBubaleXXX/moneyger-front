import React, { useState } from 'react';

import { TransactionFilterRequest } from '../../api/types';
import { NavigationBar } from '../../components/toolbars/NavigationBar';
import { TransactionListTopbar } from '../../components/toolbars/TransactionListTopbar';
import { TransactionList } from '../../components/transactions/TransactionList';

export const Transactions = () => {
  const [topbarMounted, setTopbarMounted] = useState<boolean>(false);

  const [requestParams, setRequestParams] = useState<TransactionFilterRequest>({});

  return (
    <>
      <TransactionListTopbar
        initialParams={requestParams}
        onUpdateParams={setRequestParams}
        onMount={() => setTopbarMounted(true)}
      />
      {
        <TransactionList
          filters={requestParams}
          skip={!topbarMounted}
          loading={!topbarMounted}
          sx={{
            marginBottom: '50px',
          }}
        />
      }
      <NavigationBar />
    </>
  );
};
