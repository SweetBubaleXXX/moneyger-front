import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  JwtToken,
  LoginRequest,
  RegistrationRequest,
  RegistrationResponse, 
} from './types';
import { REHYDRATE } from 'redux-persist';
import { RootState } from '../../store';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:80/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token;
      token && headers.set('authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => '/categories/',
    }),
    login: builder.mutation<JwtToken, LoginRequest>({
      query: credentials => ({
        url: 'accounts/auth/jwt/create/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: body => ({
        url: 'accounts/auth/users/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
} = api;
