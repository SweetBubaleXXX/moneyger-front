import moment from 'moment';

import { Period } from '../components/period/types';

const DATE_FORMAT = 'YYYY-MM-DD';

export const parsePeriodFilters = (period: Period) => ({
  dateGte: moment(period.from).format(DATE_FORMAT),
  dateLte: moment(period.to).format(DATE_FORMAT),
});
