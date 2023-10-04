import {
  IconButton,
  Input,
} from '@mui/joy';
import { useDebounce } from '@uidotdev/usehooks';
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
import {
  Filters,
  TranasctionFilterModal,
} from '../transactions/TransactionFilterModal';
import { BaseTopbar } from './BaseTopbar';
import { SEARCH_DEBOUNCE_DELAY } from './constants';

export type TransactionListTopbarProps = {
  initialParams?: TransactionRequestParams,
  onUpdateParams: (params: TransactionRequestParams) => void,
  onMount?: () => void,
}

export const TransactionListTopbar = ({
  initialParams,
  onUpdateParams,
  onMount,
}: TransactionListTopbarProps) => {
  const [filtersModalOpen, setFiltersModalOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>(initialParams ?? {});
  const [orderingAscending, setOrderingAscending] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    onMount?.();
  }, [onMount]);

  useEffect(() => {
    onUpdateParams({
      ...filters,
      search: debouncedSearchTerm,
      ordering: orderingAscending ? 'transaction_time' : '-transaction_time',
    });
  }, [onUpdateParams, filters, orderingAscending, debouncedSearchTerm]);

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
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
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
          setFilters(filters);
        }}
      />
    </>
  );
};
