import { SxProps } from '@mui/joy/styles/types';

export const CURRENCY_CODES = ['USD', 'EUR', 'RUB', 'BYN'] as const;

export const OVERFLOW_ELLIPSIS: SxProps = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};

export const DATE_INPUT_FORMAT = 'YYYY-MM-DD';

export const DATETIME_INPUT_FORMAT = 'YYYY-MM-DDTHH:mm';
