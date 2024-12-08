import { BoxProps } from '@mui/joy';

export const ROUTER_PATHS = {
  home: '/',
  login: '/login',
  forgotPassword: '/password-reset',
  activateAccount: '/actions/activate/:uid/:token',
  passwordReset: '/actions/password-reset/:uid/:token',
  chat: '/chat',
  settings: '/settings',
  categories: '/categories',
  categoryById: '/categories/:categoryId',
  transactions: '/transactions',
  tags: '/tags',
  categoryStatsById: `/categories/:categoryId/stats`,
  getCategoryById: (categoryId: number) => `/categories/${categoryId}`,
} as const;

export const BOTTOM_TOOLBAR_PROPS: BoxProps = {
  position: 'fixed',
  padding: 2,
  pb: 3,
  left: 0,
  bottom: 35,
  right: 0,
};

export const LIST_OFFSET_FOR_TOOLBAR = {
  mb: 13,
};
