import {
  IconButton,
  Input,
} from '@mui/joy';
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Filter,
  Search,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import {
  TransactionRequestParams,
} from '../../features/api/types';
import { TranasctionFilterModal } from '../transactions/TransactionFilterModal';
import { BaseTopbar } from './BaseTopbar';

export type TransactionListTopbarProps = {
  initialParams: TransactionRequestParams,
  onUpdateParams: (params: TransactionRequestParams) => void,
}

export const TransactionListTopbar = ({
  initialParams,
  onUpdateParams,
}: TransactionListTopbarProps) => {
  const [filtersModalOpen, setFiltersModalOpen] = useState<boolean>(false);
  const [orderingAscending, setOrderingAscending] = useState<boolean>(false);

  const [
    requestParams, setRequestParams,
  ] = useState<TransactionRequestParams>(initialParams);

  useEffect(() => {
    setRequestParams({
      ...requestParams,
      ordering: orderingAscending ? 'transaction_time' : '-transaction_time',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderingAscending]);

  useEffect(() => {
    onUpdateParams(requestParams);
  }, [onUpdateParams, requestParams]);

  return (
    <>
      <BaseTopbar>
        <IconButton onClick={() => setOrderingAscending(!orderingAscending)}>
          {orderingAscending ? <ArrowUpWideNarrow /> : <ArrowDownWideNarrow />}
        </IconButton>
        <Input
          variant="soft"
          startDecorator={<Search />}
          placeholder="Search"
          sx={{
            '--Input-minHeight': '32px',
          }}
        />
        <IconButton onClick={() => setFiltersModalOpen(true)}>
          <Filter />
        </IconButton>
      </BaseTopbar>
      <TranasctionFilterModal
        open={filtersModalOpen}
        onClose={filters => {
          setFiltersModalOpen(false);
          setRequestParams({
            ...filters,
            ordering: requestParams.ordering,
          });
        }}
      />
    </>
  );
};
