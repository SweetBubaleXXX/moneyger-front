import { getPaginationQuery } from '../../helpers/pagination';

export const API_PATHS = {
  createToken: 'accounts/auth/jwt/create/',
  refreshToken: 'accounts/auth/jwt/refresh/',
  logout: 'accounts/auth/jwt/logout/',
  registerAccount: 'accounts/auth/users/',
  getAccount: 'accounts/auth/users/me/',
  exportCsv: 'export/csv/',
  exportJson: 'export/json/',
  getAllCategories: 'categories/?limit=99999&ordering=display_order',
  createCategory: 'categories/',
  getTransactionsSummary: 'transactions/summary/',
  getAccountById: (accountId: number) => `accounts/auth/users/${accountId}/`,
  getCategories: (pageNumber: number = 1) =>
    `categories/?${getPaginationQuery(pageNumber)}`,
  getCategoryById: (categoryId: number) => `categories/${categoryId}/`,
  getSubcategories: (categoryId: number) =>
    `categories/${categoryId}/subcategories/`,
  getTransactions: (pageNumber: number = 1) =>
    `transactions/?${getPaginationQuery(pageNumber)}`,
  getTransactionById: (transactionId: number) =>
    `transactions/${transactionId}/`,
  createTransaction: (categoryId: number) =>
    `categories/${categoryId}/transactions/`,
} as const;

export const EXCLUDE_FROM_REAUTH: readonly string[] = [
  API_PATHS.createToken,
  API_PATHS.logout,
] as const;

export const PAGE_SIZE = 100;
