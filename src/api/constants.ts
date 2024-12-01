import { getPaginationQuery } from './helpers';

export const BASE_URL = process.env.REACT_APP_API_URL || '/api/';

export const API_PATHS = {
  messages: 'chat/messages/',
  createToken: 'auth/jwt/create/',
  refreshToken: 'auth/jwt/refresh/',
  registerAccount: 'auth/users/',
  activateAccount: 'auth/users/activation/',
  resetPassword: 'auth/users/reset_password/',
  resetPasswordConfirm: 'auth/users/reset_password_confirm/',
  setPassword: 'auth/users/set_password/',
  logout: 'auth/jwt/logout/',
  account: 'auth/users/me/',
  exportCsv: 'export/csv/',
  exportJson: 'export/json/',
  categories: 'categories/',
  categoryOrder: 'categories/order/',
  stats: 'stats/',
  accountById: (accountId: number) => `auth/users/${accountId}/`,
  categoryById: (categoryId: number) => `categories/${categoryId}/`,
  subcategories: (categoryId: number) => `categories/${categoryId}/subcategories/`,
  transactions: (pageNumber: number = 1) => `transactions/?${getPaginationQuery(pageNumber)}`,
  transactionById: (transactionId: number) => `transactions/${transactionId}/`,
  createTransaction: (categoryId: number) => `categories/${categoryId}/transactions/`,
} as const;

export const WS_PATHS = {
  chat: 'ws/chat/',
};

export const EXCLUDE_FROM_REAUTH: readonly string[] = [
  API_PATHS.createToken,
  API_PATHS.activateAccount,
  API_PATHS.logout,
] as const;

export const PAGE_SIZE = 100;

export enum WebsocketCustomCode {
  // eslint-disable-next-line no-unused-vars
  UNAUTHORIZED = 4001,
}
