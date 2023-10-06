import {
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListSubheader,
} from '@mui/joy';
import React from 'react';

import {
  filterCategoriesSelector,
  useGetAllCategoriesQuery,
  useGetTransactionsSummaryQuery,
} from '../../features/api/apiSlice';
import {
  TransactionRequestParams,
  TransactionType,
} from '../../features/api/types';
import { CategoryBar } from './CategoryBar';

export type PrimaryCategoriesSummaryWidgetProps = {
  transactionType: TransactionType,
  filters?: TransactionRequestParams,
}

export const PrimaryCategoriesSummaryWidget = ({
  transactionType,
  filters,
}: PrimaryCategoriesSummaryWidgetProps) => {
  const summary = useGetTransactionsSummaryQuery({
    ...filters,
    transactionType,
  });

  const subcategories = useGetAllCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: filterCategoriesSelector(
        data,
        category => category.parentCategory === null &&
          category.transactionType === transactionType
      ),
      isLoading,
    }),
  });

  return (
    <>
      <Box
        maxWidth="sm"
        mx="auto"
        px={2}
        py={1}
      >
        <Card size="sm">
          <CardContent>
            <List size="sm">
              <ListSubheader>
                {transactionType === 'IN' ? 'INCOME' : 'OUTCOME'}
              </ListSubheader>
              {
                subcategories.data?.map(category =>
                  !!summary.data?.total &&
                  <ListItem>
                    <ListItemButton>
                      <ListItemContent>
                        <CategoryBar
                          category={category}
                          total={summary.data.total}
                          filters={filters}
                        />
                      </ListItemContent>
                    </ListItemButton>
                  </ListItem>
                )
              }
            </List>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
