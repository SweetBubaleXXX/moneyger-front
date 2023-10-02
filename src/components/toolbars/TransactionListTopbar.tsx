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

import { TransactionRequestParams } from '../../features/api/types';
import { TranasctionFilterModal } from '../transactions/TransactionFilterModal';
import { BaseTopbar } from './BaseTopbar';

export type TransactionListTopbarProps = {
  params: TransactionRequestParams,
  onUpdateParams: (params: TransactionRequestParams) => void,
}

export const TransactionListTopbar = ({
  params,
  onUpdateParams,
}: TransactionListTopbarProps) => {
  const [filtersModalOpen, setFiltersModalOpen] = useState<boolean>(false);
  const [orderingAscending, setOrderingAscending] = useState<boolean>(false);

  useEffect(() => {

  }, []);

  return (
    <>
      <BaseTopbar>
        <IconButton onClick={() => setOrderingAscending(!orderingAscending)}>
          {orderingAscending ? <ArrowDownWideNarrow /> : <ArrowUpWideNarrow />}
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
        }}
      />
    </>
  );
};
