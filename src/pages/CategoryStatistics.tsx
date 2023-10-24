import { Box } from '@mui/joy';
import React, { useState } from 'react';

import {
  DEFAULT_PERIOD,
  PeriodSelector,
} from '../components/period/PeriodSelector';
import { Period } from '../components/period/types';
import {
  CategoriesStatsWidget,
} from '../components/summary/CategoriesStatsWidget';
import {
  CategoryStatsTopbar,
} from '../components/toolbars/CategoryStatsTopbar';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import {
  selectCategoryById,
  useGetCategoriesQuery,
} from '../features/api/apiSlice';
import { parsePeriodFilters } from '../helpers/period';
import { useCategoryIdParam } from '../hooks/params';

export const CategoryStatistics = () => {
  const categoryId = useCategoryIdParam();
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);

  const category = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: selectCategoryById(data, categoryId),
      isLoading,
    }),
  });

  const periodFilters = parsePeriodFilters(period);

  return (
    <>
      <CategoryStatsTopbar category={category.data} />
      <PeriodSelector value={period} onChange={setPeriod} />
      <Box mb="50px">
        {
          category.data &&
          <CategoriesStatsWidget
            transactionType={category.data.transactionType}
            filters={{
              ...periodFilters,
              parent_category: categoryId,
            }}
          />
        }
      </Box>
      <NavigationBar />
    </>
  );
};
