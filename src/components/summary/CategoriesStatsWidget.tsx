import { Box, Card, CardContent, CircularProgress, List, ListItem, ListItemContent, ListSubheader } from '@mui/joy';
import React from 'react';
import { useMemo } from 'react';

import { PeriodSummary, TransactionType } from '../../api/types';
import { useCategories } from '../../hooks/category';
import { CategoryBar } from './CategoryBar';

export type PrimaryCategoriesSummaryWidgetProps = {
  periodSummary?: PeriodSummary;
  transactionType: TransactionType;
  title?: string;
  isLoading?: boolean;
};

export const CategoriesStatsWidget = ({
  periodSummary,
  transactionType,
  title,
  isLoading,
}: PrimaryCategoriesSummaryWidgetProps) => {
  const categories = useCategories();

  const totalAmountCents =
    (transactionType === 'IN' ? periodSummary?.totalIncomeCents : periodSummary?.totalExpenseCents) ?? 0;

  const filteredCategories = useMemo(
    () => categories.data?.filter((category) => category.type === transactionType) ?? [],
    [categories.data, transactionType],
  );

  const summaryByCategory = useMemo(
    () =>
      filteredCategories
        .map((category) => ({ category, amountCents: periodSummary?.categoryTotals?.[category.id] ?? 0 }))
        .sort((a, b) => b.amountCents - a.amountCents),
    [filteredCategories, periodSummary?.categoryTotals],
  );

  if (!totalAmountCents) {
    return null;
  }

  return (
    <Box maxWidth="sm" mx="auto" px={2} py={1}>
      <Card size="sm">
        <CardContent>
          <List size="sm">
            <ListSubheader>{title || (transactionType === 'IN' ? 'INCOME' : 'OUTCOME')}</ListSubheader>
            {isLoading || !periodSummary ? (
              <Box mx="auto">
                <CircularProgress />
              </Box>
            ) : (
              summaryByCategory.map(
                (categoryStats, index) =>
                  !!categoryStats.amountCents && (
                    <ListItem key={index}>
                      <ListItemContent>
                        <CategoryBar
                          stats={categoryStats}
                          totalCents={totalAmountCents}
                          currency={periodSummary.currency}
                        />
                      </ListItemContent>
                    </ListItem>
                  ),
              )
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};
