import { CURRENCY_CODES } from '../../constants';

export type AuthState = {
  accessToken?: string,
}

export type PaginatedResponse<T> = {
  count: number,
  results: T,
}

export type PaginatedParamsRequest<T> = {
  page?: number,
  params: T,
}

export interface LoginRequest {
  username: string,
  password: string,
}

export interface RegistrationRequest extends LoginRequest {
  email: string,
}

export type RegistrationResponse = {
  id: number
  email: string,
  username: string,
}

export type JwtToken = {
  access: string,
  refresh: string,
}

export type CurrencyCode = typeof CURRENCY_CODES[number]

export type TransactionType = 'IN' | 'OUT'

export type Account = {
  id: number,
  username: string,
  email: string,
  defaultCurrency: CurrencyCode,
}

export type Category = {
  id: number,
  parentCategory: number | null,
  transactionType: TransactionType,
  name: string,
  displayOrder: number,
  icon: string,
  color: string,
}

export type CategoryRequestParams = {
  transactionType?: TransactionType,
  notSubcategory?: boolean,
  ordering?: string,
  search?: string,
}

export type PaginatedCategoryRequest =
  PaginatedParamsRequest<CategoryRequestParams>

export type CategoryCreateRequest = Omit<
  Category, 'id' | 'parentCategory' | 'displayOrder' | 'icon' | 'color'
> & Partial<Pick<Category, 'icon' | 'color'>>

export type Transaction = {
  id: number,
  category: number,
  transactionType: TransactionType,
  amount: string,
  currency: CurrencyCode,
  comment: string,
  transactionTime: string,
}

export type TransactionCreateUpdateRequest = Omit<
  Transaction, 'id' | 'transactionType' | 'comment' | 'transactionTime'
> & Partial<Pick<Transaction, 'comment' | 'transactionTime'>>

export type TransactionRequestParams = {
  category?: number,
  currency?: CurrencyCode,
  transactionType?: TransactionType,
  transactionTimeAfter?: string,
  transactionTimeBefore?: string,
  ordering?: string,
  search?: string,
}

export type PaginatedTransactionRequest =
  PaginatedParamsRequest<TransactionRequestParams>

export type TransactionMutationParams = {
  id: number,
  params?: PaginatedTransactionRequest,
}

export type Summary = {
  total: number,
  currency: CurrencyCode,
}
