import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface LoginRequest {
  username: string,
  password: string,
}

export interface LoginResponse {
  expiry: Date,
  token: string,
}

export const api = createApi({
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/categories',
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'accounts/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = api;
