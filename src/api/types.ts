import { CURRENCY_CODES } from '../constants';

export type AuthState = {
  accessToken?: string;
};

export type PaginatedResponse<T> = {
  result: T;
  resultLength: number;
};

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegistrationRequest extends LoginRequest {
  email: string;
}

export type RegistrationResponse = {
  id: number;
  email: string;
  username: string;
};

export type JwtToken = {
  access: string;
  refresh: string;
};

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export type TransactionType = 'IN' | 'OUT';

export type TransactionOrdering = 'timestamp' | '-timestamp';

export type Account = {
  id: number;
  username: string;
  email: string;
  defaultCurrency: CurrencyCode;
};

export type AccountUpdateRequest = Partial<Pick<Account, 'defaultCurrency'>>;

export type AccountActivationRequest = {
  uid: string;
  token: string;
};

export type SetPasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type PasswordResetRequest = {
  uid: string;
  token: string;
  newPassword: string;
};

export type PasswordResetForm = Pick<PasswordResetRequest, 'newPassword'> & {
  confirmPassword: string;
};

export type Category = {
  id: number;
  parentId: number | null;
  rootId: number | null;
  type: TransactionType;
  name: string;
  displayOrder: number;
  icon: string;
  color: string;
};

export type CategoryRequestParams = {
  parent_category?: number;
  transactionType?: TransactionType;
  notSubcategory?: boolean;
  ordering?: string;
  search?: string;
};

export type CategoryCreateRequest = {
  type: TransactionType;
  name: string;
  displayOrder: number;
  icon: string;
  color?: string;
};

export type SubcategoryCreateRequest = {
  name: string;
};

export type CategoryUpdateRequest = {
  name?: string;
  icon?: string;
  color?: string;
};

export type Tag = {
  id: number;
  ownerId: number;
  name: string;
  createdAt: string;
};

export type TagCreateRequest = {
  name: string;
};

export type Transaction = {
  id: number;
  currency: CurrencyCode;
  amountCents: number;
  comment?: string;
  timestamp: string;
  category: Category;
  tags: Tag[];
};

export type TransactionUpsertRequest = {
  categoryId: number;
  currency: CurrencyCode;
  amountCents: number;
  comment?: string;
  timestamp?: string;
  tags?: number[];
};

export type TransactionFilterRequest = {
  rootCategoryId?: number;
  categoryId?: number;
  transactionType?: TransactionType;
  currency?: CurrencyCode;
  dateGte?: string;
  dateLte?: string;
  search?: string;
  ordering?: TransactionOrdering;
  page?: number;
};

export type TransactionMutationParams = {
  id: number;
  params?: TransactionFilterRequest;
};

export type PeriodSummary = {
  currency: CurrencyCode;
  totalIncomeCents: number;
  totalExpenseCents: number;
  categoryTotals: { [id: number]: number };
};

export type Message = {
  messageId: string;
  user: string;
  isAdmin: boolean;
  messageText: string;
  timestamp: number;
};

export type OutgoingMessage = {
  message: string;
};
