import { BoxProps } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';

export const ROUTER_PATHS = {
  home: '/',
  login: '/login',
  settings: '/settings',
  categories: '/categories',
  categoryById: '/categories/:categoryId',
  getCategoryById: (categoryId: number) => `/categories/${categoryId}`,
} as const;

export const CATEGORY_BOTTOM_TOOLBAR_PROPS: BoxProps = {
  position: 'fixed',
  padding: 2,
  pb: 3,
  left: 0,
  bottom: 35,
  right: 0,
};

export const CATEGORY_LIST_OFFSET_FOR_TOOLBAR: SxProps = {
  mb: 13,
};
