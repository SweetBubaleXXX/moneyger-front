import { getPaginationQuery } from '../../helpers/pagination';

export const API_PATHS = {
  createToken: 'accounts/auth/jwt/create/',
  refreshToken: 'accounts/auth/jwt/refresh/',
  registerAccount: 'accounts/auth/users/',
  getAccount: 'accounts/auth/users/me/',
  getAllCategories: 'categories/?limit=99999&ordering=display_order',
  getTransactionsSummary: 'transactions/summary/',
  getCategories: (pageNumber: number = 1) =>
    `categories/?${getPaginationQuery(pageNumber)}`,
  getCategoryById: (categoryId: number) => `categories/${categoryId}/`,
  getTransactions: (pageNumber: number = 1) =>
    `transactions/?${getPaginationQuery(pageNumber)}`,
  getTransactionById: (transactionId: number) =>
    `transactions/${transactionId}/`,
  createTransaction: (categoryId: number) =>
    `categories/${categoryId}/transactions/`,
} as const;

export const EXCLUDE_FROM_REAUTH: readonly string[] = [
  API_PATHS.createToken,
] as const;

export const PAGE_SIZE = 100;
