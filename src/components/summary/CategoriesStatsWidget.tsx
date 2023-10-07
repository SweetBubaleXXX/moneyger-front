import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemContent,
  ListSubheader,
} from '@mui/joy';
import React from 'react';

import { useGetCategoriesStatsQuery } from '../../features/api/apiSlice';
import { StatsRequestParams, TransactionType } from '../../features/api/types';
import { CategoryBar } from './CategoryBar';

export type PrimaryCategoriesSummaryWidgetProps = {
  transactionType: TransactionType,
  filters?: StatsRequestParams,
}

export const CategoriesStatsWidget = ({
  transactionType,
  filters,
}: PrimaryCategoriesSummaryWidgetProps) => {
  const stats = useGetCategoriesStatsQuery({
    ...filters,
    transactionType,
  });

  if (!stats.data?.total) {
    return null;
  }

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
                stats.isFetching ?
                  <Box mx="auto">
                    <CircularProgress
                      color="neutral"
                    />
                  </Box>
                  :
                  stats.data?.categories.map(categoryStats =>
                    !!categoryStats.total &&
                    <ListItem>
                      <ListItemContent>
                        <CategoryBar
                          stats={categoryStats}
                          total={stats.data!.total}
                          currency={stats.data?.currency}
                        />
                      </ListItemContent>
                    </ListItem>
                  )
              }
            </List>
          </CardContent>
        </Card>
      </Box >
    </>
  );
};
