import { CURRENCY_CODES } from '../../constants';

export type AuthState = {
  accessToken?: string,
}

export interface PaginatedResponse<T> {
  count: number,
  results: T[],
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

export type CurrencyCode =  typeof CURRENCY_CODES[number]

export type TransactionType = 'IN' | 'OUT';

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

export type Transaction = {
  id: number,
  category: number,
  transactionType: TransactionType,
  amount: string,
  currency: CurrencyCode,
  comment: string,
  transactionTime: string,
}

export type TransactionCreateRequest = Omit<
  Transaction, 'id' | 'transactionType'
>
