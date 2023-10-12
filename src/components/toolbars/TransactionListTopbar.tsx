import {
  Badge,
  IconButton,
  Input,
} from '@mui/joy';
import { useDebounce, useThrottle } from '@uidotdev/usehooks';
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Filter,
  Search,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { DEFAULT_THROTTLING_DELAY } from '../../constants';
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

  const throttledOrderingAscending = useThrottle(
    orderingAscending, 
    DEFAULT_THROTTLING_DELAY,
  );

  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_DELAY);

  useEffect(() => {
    onMount?.();
  }, [onMount]);

  useEffect(() => {
    onUpdateParams({
      ...filters,
      search: debouncedSearchTerm,
      ordering: throttledOrderingAscending ?
        'transaction_time' : '-transaction_time',
    });
  }, [
    onUpdateParams,
    filters,
    throttledOrderingAscending,
    debouncedSearchTerm,
  ]);

  return (
    <>
      <BaseTopbar>
        <IconButton onClick={() => setOrderingAscending(!orderingAscending)}>
          {orderingAscending ? <ArrowUpWideNarrow /> : <ArrowDownWideNarrow />}
        </IconButton>
        <Input
          variant="outlined"
          startDecorator={<Search strokeWidth={1} />}
          endDecorator={searchTerm &&
            <IconButton onClick={() => setSearchTerm('')}>
              <X />
            </IconButton>
          }
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value.toLowerCase())}
          sx={{
            '--Input-minHeight': '32px',
          }}
        />
        <IconButton onClick={() => setFiltersModalOpen(true)}>
          <Badge
            invisible={!Object.keys(filters).length}
            size="sm"
          >
            <Filter />
          </Badge >
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
