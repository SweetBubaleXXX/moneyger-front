import { getPaginationQuery } from '../../helpers/pagination';

export const BASE_URL = process.env.REACT_APP_API_URL || '/api/';

export const API_PATHS = {
  messages: 'chat/messages/',
  createToken: 'accounts/auth/jwt/create/',
  refreshToken: 'accounts/auth/jwt/refresh/',
  registerAccount: 'accounts/auth/users/',
  activateAccount: 'accounts/auth/users/activation/',
  resetPassword: 'accounts/auth/users/reset_password/',
  resetPasswordConfirm: 'accounts/auth/users/reset_password_confirm/',
  setPassword: 'accounts/auth/users/set_password/',
  logout: 'accounts/auth/jwt/logout/',
  getAccount: 'accounts/auth/users/me/',
  importJson: 'import/json/',
  exportCsv: 'export/csv/',
  exportJson: 'export/json/',
  getCategories: 'categories/?all',
  createCategory: 'categories/',
  getCategoriesStats: 'categories/stats/',
  getTransactionsSummary: 'transactions/summary/',
  getAccountById: (accountId: number) => `accounts/auth/users/${accountId}/`,
  getCategoryById: (categoryId: number) => `categories/${categoryId}/`,
  getSubcategories: (categoryId: number) =>
    `categories/${categoryId}/subcategories/`,
  getTransactions: (pageNumber: number = 1) =>
    `transactions/?${getPaginationQuery(pageNumber)}`,
  getTransactionById: (transactionId: number) =>
    `transactions/${transactionId}/`,
  createTransaction: (categoryId: number) =>
    `categories/${categoryId}/transactions/`,
  getCategorySummary: (categoryId: number) =>
    `categories/${categoryId}/summary/`,
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
