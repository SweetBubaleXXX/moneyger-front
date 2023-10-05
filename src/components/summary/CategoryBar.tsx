import React from 'react';

import { useGetCategorySummaryQuery } from '../../features/api/apiSlice';
import { Category, TransactionRequestParams } from '../../features/api/types';
import { Box } from '@mui/joy';

export type CategoryBarProps = {
  category: Category,
  total: number,
  filters?: TransactionRequestParams,
}

export const CategoryBar = ({
  category,
  total,
  filters,
}: CategoryBarProps) => {
  const summary = useGetCategorySummaryQuery({
    id: category.id,
    ...filters,
  });

  return (
    <>
      <Box>
        {summary.data && summary.data.total / total}
      </Box>
    </>
  );
};
