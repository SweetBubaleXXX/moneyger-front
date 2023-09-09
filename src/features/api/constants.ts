export const API_PATHS = {
  refreshToken: 'accounts/auth/jwt/refresh/',
  getCategories: 'categories/',
  createToken: 'accounts/auth/jwt/create/',
  registerAccount: 'accounts/auth/users/',
} as const;

export const EXCLUDE_FROM_REAUTH: readonly string[] = [
  API_PATHS.createToken,
] as const;
