import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Mutex } from 'async-mutex';
import { REHYDRATE } from 'redux-persist';
import {
  JwtToken,
  LoginRequest,
  RegistrationRequest,
  RegistrationResponse, 
} from './types';
import { RootState } from '../../store';
import { setToken } from './auth';

const reauthMutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:80/',
  prepareHeaders: (headers, { getState }) => {
    const csrfToken = Cookies.get('csrftoken');
    csrfToken && headers.set('x-csrftoken', csrfToken);
    const token = (getState() as RootState).token;
    token && headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
  credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
string | FetchArgs, unknown, FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await reauthMutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!reauthMutex.isLocked()) {
      const release = await reauthMutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url:'/accounts/auth/jwt/refresh/',
            method: 'POST',
          }, api, extraOptions
        );
        if (refreshResult.data) {
          const {
            access: accessToken,
          } = refreshResult.data as { access: string };
          api.dispatch(setToken(accessToken));
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        release();
      }
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
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
