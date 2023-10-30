import { Period } from '../components/period/types';

export const parsePeriodFilters = (period: Period) => ({
  transactionTimeAfter: period.from.toISOString(),
  transactionTimeBefore: period.to.toISOString(),
});
