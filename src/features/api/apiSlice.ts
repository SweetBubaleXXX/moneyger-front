import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { LoginResponse, LoginRequest } from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery(),
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/categories',
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'accounts/auth/jwt/create',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = api;
