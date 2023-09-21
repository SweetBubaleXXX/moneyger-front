import {
  Box,
  IconButton,
} from '@mui/joy';
import { Cross } from 'lucide-react';
import React, { useState } from 'react';

import {
  DEFAULT_PERIOD,
  PeriodSelector,
} from '../components/period/PeriodSelector';
import { Period } from '../components/period/types';
import { SummaryWidget } from '../components/summary/SummaryWidget';
import {
  TransactionCreationModal,
} from '../components/transactions/TransactionCreationModal';
import { TransactionList } from '../components/transactions/TransactionList';
import {
  useGetTransactionsSummaryQuery,
} from '../features/api/apiSlice';

export const Home = () => {
  const [
    transactionCreationModalOpen,
    setTransactionCreationModalOpen,
  ] = useState<boolean>(false);
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);
  const periodFilters = {
    transactionTimeAfter: period.from.toISOString(),
    transactionTimeBefore: period.to.toISOString(),
  };
  const incomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'IN',
    ...periodFilters,
  });
  const outcomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'OUT',
    ...periodFilters,
  });

  return (
    <>
      <SummaryWidget
        income={incomeSummary.data?.total || 0}
        outcome={outcomeSummary.data?.total || 0}
        currency={incomeSummary.data?.currency}
        isLoading={incomeSummary.isFetching || outcomeSummary.isFetching}
        isError={incomeSummary.isError || outcomeSummary.isError}
      />
      <Box display="flex" justifyContent="center" padding={2}>
        <PeriodSelector value={period} onChange={setPeriod} />
      </Box>
      <TransactionList
        filters={periodFilters}
        freezeState={transactionCreationModalOpen}
        sx={{
          marginBottom: '75px',
        }}
      />
      <Box
        zIndex={1250}
        position="fixed"
        bottom={0}
        paddingBottom={1.5}
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <IconButton
          variant="solid"
          onClick={() => setTransactionCreationModalOpen(true)}
          sx={{
            '--IconButton-size': '70px',
            borderRadius: '100%',
          }}
        >
          <Cross />
        </IconButton>
      </Box>
      <TransactionCreationModal
        open={transactionCreationModalOpen}
        onClose={setTransactionCreationModalOpen}
      />
    </>
  );
};
