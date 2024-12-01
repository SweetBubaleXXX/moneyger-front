import { useThrottle } from '@uidotdev/usehooks';
import React, { useCallback, useMemo } from 'react';
import { createContext, useContext, useState } from 'react';

import { useGetSummaryQuery } from '../../api/apiSlice';
import { PeriodSummary } from '../../api/types';
import { DEFAULT_PERIOD } from '../../components/period/PeriodSelector';
import { Period } from '../../components/period/types';
import { DEFAULT_THROTTLING_DELAY } from '../../constants';
import { parsePeriodFilters } from '../../helpers/period';

type HomeContextType = {
  isTransactionFormOpen: boolean;
  openTransactionForm: () => void;
  closeTransactionForm: () => void;
  period: Period;
  setPeriod: (period: Period) => void;
  periodFilters: Record<string, string>;
  periodSummary?: PeriodSummary;
  isLoadingSummary: boolean;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeContextProvider');
  }
  return context;
};

export const HomeContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const openTransactionForm = useCallback(() => setIsTransactionFormOpen(true), []);
  const closeTransactionForm = useCallback(() => setIsTransactionFormOpen(false), []);

  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);
  const throttledPeriod = useThrottle(period, DEFAULT_THROTTLING_DELAY);
  const periodFilters = useMemo(() => parsePeriodFilters(throttledPeriod), [throttledPeriod]);

  const { data: periodSummary, isLoading: isLoadingSummary } = useGetSummaryQuery(periodFilters);

  const value = useMemo(
    (): HomeContextType => ({
      isTransactionFormOpen,
      openTransactionForm,
      closeTransactionForm,
      period,
      setPeriod,
      periodFilters,
      periodSummary,
      isLoadingSummary,
    }),
    [
      closeTransactionForm,
      isLoadingSummary,
      isTransactionFormOpen,
      openTransactionForm,
      period,
      periodFilters,
      periodSummary,
    ],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
