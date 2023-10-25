import { Box, Divider, IconButton } from '@mui/joy';
import { Plus } from 'lucide-react';
import React, { useState } from 'react';

import {
  DEFAULT_PERIOD,
  PeriodSelector,
} from '../components/period/PeriodSelector';
import { Period } from '../components/period/types';
import {
  CategoriesStatsWidget,
} from '../components/summary/CategoriesStatsWidget';
import { SummaryWidget } from '../components/summary/SummaryWidget';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import {
  TransactionCreationModal,
} from '../components/transactions/TransactionCreationModal';
import { TransactionList } from '../components/transactions/TransactionList';
import { parsePeriodFilters } from '../helpers/period';

export const Home = () => {
  const [
    transactionCreationModalOpen,
    setTransactionCreationModalOpen,
  ] = useState<boolean>(false);

  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);

  const periodFilters = parsePeriodFilters(period);

  return (
    <>
      <SummaryWidget filters={periodFilters} />
      <PeriodSelector value={period} onChange={setPeriod} />
      <CategoriesStatsWidget
        transactionType="OUT"
        filters={periodFilters}
      />
      <CategoriesStatsWidget
        transactionType="IN"
        filters={periodFilters}
      />
      <Box
        maxWidth={250}
        mx="auto"
        pt={2}
      >
        <Divider>Transactions</Divider>
      </Box>
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
