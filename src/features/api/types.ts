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

export type Account = {
  id: number,
  username: string,
  email: string,
  default_currency: string,
}

export type CurrencyCode = 'USD' | 'EUR' | 'RUB' | 'BYN';

export type TransactionType = 'IN' | 'OUT';

export type Category = {
  id: number,
  parent_category: number | null,
  transaction_type: TransactionType,
  name: string,
  display_order: number,
  icon: string,
  color: string,
}

export type Transaction = {
  id: number,
  category: number,
  transaction_type: TransactionType,
  amount: string,
  currency: CurrencyCode,
  comment: string,
  transaction_time: string,
}
