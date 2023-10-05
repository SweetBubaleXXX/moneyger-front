import React from 'react';

import {
  filterCategoriesSelector,
  useGetAllCategoriesQuery,
  useGetTransactionsSummaryQuery,
} from '../../features/api/apiSlice';
import { TransactionRequestParams } from '../../features/api/types';
import { CategoryBar } from './CategoryBar';

export type PrimaryCategoriesSummaryWidgetProps = {
  filters?: TransactionRequestParams,
}

export const PrimaryCategoriesSummaryWidget = ({
  filters,
}: PrimaryCategoriesSummaryWidgetProps) => {
  const summary = useGetTransactionsSummaryQuery({ ...filters });

  const subcategories = useGetAllCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: filterCategoriesSelector(
        data,
        category => category.parentCategory === null
      ),
      isLoading,
    }),
  });

  return (
    <>
      {
        subcategories.data?.map(category =>
          summary.data && <CategoryBar category={category} total={summary.data.total} />)
      }
    </>
  );
};
