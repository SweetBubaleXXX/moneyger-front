import { SxProps } from '@mui/joy/styles/types';

export const CURRENCY_CODES = ['USD', 'EUR', 'RUB', 'BYN'] as const;

export const PAGE_SIZE = 100;

export const OVERFLOW_ELLIPSIS: SxProps = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
};
