export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  expiry: Date;
  token: string;
}
