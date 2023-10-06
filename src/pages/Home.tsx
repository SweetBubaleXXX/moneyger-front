import {
  Box,
  IconButton,
} from '@mui/joy';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import {
  DEFAULT_PERIOD,
  PeriodSelector,
} from '../components/period/PeriodSelector';
import { Period } from '../components/period/types';
import {
  PrimaryCategoriesSummaryWidget,
} from '../components/summary/PrimaryCategoriesSummaryWidget';
import { SummaryWidget } from '../components/summary/SummaryWidget';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import {
  TransactionCreationModal,
} from '../components/transactions/TransactionCreationModal';
import { TransactionList } from '../components/transactions/TransactionList';

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

  return (
    <>
      <SummaryWidget filters={periodFilters} />
      <Box display="flex" justifyContent="center" padding={2}>
        <PeriodSelector value={period} onChange={setPeriod} />
      </Box>
      <PrimaryCategoriesSummaryWidget
        transactionType="OUT"
        filters={periodFilters}
      />
      <PrimaryCategoriesSummaryWidget
        transactionType="IN"
        filters={periodFilters}
      />
      <TransactionList
        filters={periodFilters}
        skip={transactionCreationModalOpen}
        sx={{
          marginBottom: '75px',
        }}
      />
      <IconButton
        variant="solid"
        color="danger"
        onClick={() => setTransactionCreationModalOpen(true)}
        sx={{
          '--IconButton-size': '60px',
          position: 'fixed',
          bottom: 15,
          left: '50%',
          right: '50%',
          transform: 'translate(-50%, 0)',
          zIndex: 1250,
          borderRadius: '100%',
          boxShadow: 'lg',
        }}
      >
        <Plus />
      </IconButton>
      <NavigationBar centerSpacing={15} />
      <TransactionCreationModal
        open={transactionCreationModalOpen}
        onClose={setTransactionCreationModalOpen}
      />
    </>
  );
};
