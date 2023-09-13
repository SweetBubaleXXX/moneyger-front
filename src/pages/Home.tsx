import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  Stack,
} from '@mui/joy';
import { Cross } from 'lucide-react';
import { 
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
} from '../features/api/apiSlice';
import {
  TransactionWidget,
} from '../components/transactions/TransactionWidget';
import {
  PeriodSelector, 
  DEFAULT_PERIOD,
} from '../components/period/PeriodSelector';
import { Period } from '../components/period/types';
import { SummaryWidget } from '../components/summary/SummaryWidget';
import { PAGE_SIZE } from '../features/api/constants';
import { ROUTER_PATHS } from './constants';

export default () => {
  const [page, setPage] = useState<number>(1);
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);
  const periodFilters = {
    transactionTimeAfter: period.from.toISOString(),
    transactionTimeBefore: period.to.toISOString(),
  };
  const transactions = useGetTransactionsQuery({
    page,
    params: periodFilters,
  });
  const incomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'IN',
    ...periodFilters,
  });
  const outcomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'OUT',
    ...periodFilters,
  });
  const totalPages = (transactions.data?.count || 0) / PAGE_SIZE;
  const showLoadMoreButton = totalPages > page;

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
        <PeriodSelector value={period} onChange={value => {
          setPeriod(value);
          setPage(1);
        }}/>
      </Box>
      <Stack spacing={2} padding={2} marginX="auto" sx={{
        maxWidth: { sm: 'sm' },
        marginBottom: '75px',
      }}>
        {
          transactions.data?.results.map(
            (transaction, index) =>
              <TransactionWidget
                key={index}
                transaction={transaction}
                loading={transactions.isFetching}/>
          )
        }
        {
          showLoadMoreButton && <Button
            variant="outlined"
            disabled={transactions.isFetching}
            onClick={() => setPage(page + 1)}
          >
          Load More
          </Button>
        }
      </Stack>
      <Box
        zIndex={1250}
        position="fixed"
        bottom={10}
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <Link to={ROUTER_PATHS.addTransaction}>
          <IconButton variant="solid" sx={{
            '--IconButton-size': '70px',
            borderRadius: '100%',
          }}>
            <Cross />
          </IconButton>
        </Link>
      </Box>
    </>
  );
};
