export interface LoginRequest {
  username: string;
  password: string;
}

export type JwtToken = {
  access: string;
  refresh: string;
}

export type Account = {
  id: number,
  username: string,
  email: string,
  default_currency: string,
}
