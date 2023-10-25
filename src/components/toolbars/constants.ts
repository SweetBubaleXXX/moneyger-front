import { SxProps } from '@mui/joy/styles/types';

export const SEARCH_DEBOUNCE_DELAY = 600;

export const BAR_SHEET_STYLES: SxProps = {
  px: 1,
  py: 0.5,
  zIndex: 1100,
};

export const TOP_BAR_SHEET_STYLES: SxProps = {
  position: 'sticky',
  top: 0,
  boxShadow: 'xs',
  ...BAR_SHEET_STYLES,
};

export const BOTTOM_BAR_SHEET_STYLES: SxProps = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  boxShadow: 'lg',
  ...BAR_SHEET_STYLES,
};