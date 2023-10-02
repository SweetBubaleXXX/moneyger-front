import { IconButton, Input } from '@mui/joy';
import { ArrowDownNarrowWide, Filter, Search } from 'lucide-react';
import React from 'react';

import { BaseTopbar } from './BaseTopbar';

export const TransactionListTopbar = () => {
  return (
    <BaseTopbar>
      <IconButton>
        <ArrowDownNarrowWide />
      </IconButton>
      <Input
        variant="soft"
        startDecorator={<Search />}
        placeholder="Search"
        sx={{
          '--Input-minHeight': '32px',
        }}
      />
      <IconButton>
        <Filter />
      </IconButton>
    </BaseTopbar>
  );
};
