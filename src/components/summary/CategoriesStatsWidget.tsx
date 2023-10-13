import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListSubheader,
} from '@mui/joy';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetCategoriesStatsQuery } from '../../features/api/apiSlice';
import { StatsRequestParams, TransactionType } from '../../features/api/types';
import { ROUTER_PATHS } from '../../pages/constants';
import { CategoryBar } from './CategoryBar';

export type PrimaryCategoriesSummaryWidgetProps = {
  transactionType: TransactionType,
  filters?: StatsRequestParams,
  title?: string,
}

export const CategoriesStatsWidget = ({
  transactionType,
  filters,
  title,
}: PrimaryCategoriesSummaryWidgetProps) => {
  const navigate = useNavigate();

  const stats = useGetCategoriesStatsQuery({
    ...filters,
    transactionType,
  });

  if (!stats.data?.total) {
    return null;
  }

  const categories = stats.data?.categories.map((categoryStats, index) =>
    !!categoryStats.total &&
    <ListItem key={index}>
      <ListItemButton onClick={() => navigate(
        ROUTER_PATHS.getCategoryStatsById(categoryStats.id)
      )}>
        <ListItemContent>
          <CategoryBar
            stats={categoryStats}
            total={stats.data!.total}
            currency={stats.data?.currency}
          />
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );

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
                {title || (transactionType === 'IN' ? 'INCOME' : 'OUTCOME')}
              </ListSubheader>
              {
                stats.isFetching ?
                  <Box mx="auto">
                    <CircularProgress />
                  </Box>
                  :
                  categories
              }
            </List>
          </CardContent>
        </Card>
      </Box >
    </>
  );
};
