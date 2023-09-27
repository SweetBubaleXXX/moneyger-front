import { BoxProps } from '@mui/joy';

export const ROUTER_PATHS = {
  home: '/',
  categories: '/categories',
  categoryById: '/categories/:categoryId',
  login: '/login',
} as const;

export const CATEGORY_BOTTOM_TOOLBAR_PROPS: BoxProps = {
  position: 'fixed',
  padding: 2,
  pb: 3,
  left: 0,
  bottom: 0,
  right: 0,
};
