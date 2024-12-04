import { Box, Divider, IconButton } from '@mui/joy';
import { Plus } from 'lucide-react';
import React from 'react';

import { PeriodSelector } from '../../components/period/PeriodSelector';
import { CategoriesStatsWidget } from '../../components/summary/CategoriesStatsWidget';
import { NavigationBar } from '../../components/toolbars/NavigationBar';
import { TransactionCreationModal } from '../../components/transactions/TransactionCreationModal';
import { TransactionList } from '../../components/transactions/TransactionList';
import { SummaryWidget } from './components/SummaryWidget';
import { HomeContextProvider, useHomeContext } from './context';

const HomeContent = () => {
  const {
    periodFilters,
    period,
    setPeriod,
    isTransactionFormOpen,
    openTransactionForm,
    closeTransactionForm,
    periodSummary,
    isLoadingSummary,
  } = useHomeContext();

  return (
    <>
      <SummaryWidget />
      <PeriodSelector value={period} onChange={setPeriod} />
      <CategoriesStatsWidget transactionType="OUT" periodSummary={periodSummary} isLoading={isLoadingSummary} />
      <CategoriesStatsWidget transactionType="IN" periodSummary={periodSummary} isLoading={isLoadingSummary} />
      <Box maxWidth={250} mx="auto" pt={2}>
        <Divider>Транзакции</Divider>
      </Box>
      <TransactionList
        filters={periodFilters}
        skip={isTransactionFormOpen}
        sx={{
          marginBottom: '75px',
        }}
      />
      <IconButton
        variant="solid"
        color="danger"
        onClick={openTransactionForm}
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
      <TransactionCreationModal open={isTransactionFormOpen} onClose={closeTransactionForm} />
    </>
  );
};

export const Home = () => {
  return (
    <HomeContextProvider>
      <HomeContent />
    </HomeContextProvider>
  );
};
