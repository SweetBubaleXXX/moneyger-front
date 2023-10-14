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

export type TransactionOrdering =
  'transaction_time' | '-transaction_time'

export type Account = {
  id: number,
  username: string,
  email: string,
  defaultCurrency: CurrencyCode,
}

export type AccountUpdateRequest = Partial<Pick<Account, 'defaultCurrency'>>

export type AccountActivationRequest = {
  uid: string,
  token: string,
}

export type SetPasswordRequest = {
  currentPassword: string,
  newPassword: string,
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
  parent_category?: number,
  transactionType?: TransactionType,
  notSubcategory?: boolean,
  ordering?: string,
  search?: string,
}

export type CategoryCreateRequest = Omit<
  Category, 'id' | 'parentCategory' | 'displayOrder' | 'icon' | 'color'
> & Partial<Pick<Category, 'icon' | 'color'>>

export type SubcategoryCreateRequest = Omit<
  CategoryCreateRequest, 'transactionType'
>

export type CategoryUpdateRequest = Omit<
  CategoryCreateRequest, 'transactionType'
> & Partial<Pick<Category, 'displayOrder'>>

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
  currency?: CurrencyCode | '',
  transactionType?: TransactionType | '',
  transactionTimeAfter?: string,
  transactionTimeBefore?: string,
  ordering?: TransactionOrdering,
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

export type CategoryStats = {
  id: number,
  total: number,
}

export type Stats = Summary & {
  categories: CategoryStats[]
}

export type StatsRequestParams = Pick<
  CategoryRequestParams, 'parent_category' | 'transactionType'
> & Pick<
  TransactionRequestParams, 'transactionTimeBefore' | 'transactionTimeAfter'
>
