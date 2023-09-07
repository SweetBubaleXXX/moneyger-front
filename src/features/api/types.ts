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
