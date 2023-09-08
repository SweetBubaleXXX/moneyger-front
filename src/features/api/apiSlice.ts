import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Mutex } from 'async-mutex';
import {
  PaginatedResponse,
  Transaction,
  JwtToken,
  LoginRequest,
  RegistrationRequest,
  RegistrationResponse,
  Category,
  Account, 
} from './types';
import { RootState } from '../../store';
import { setAccessToken } from './auth';
import { getPaginationQuery } from '../../helpers/pagination';

const reauthMutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const csrfToken = Cookies.get('csrftoken');
    csrfToken && headers.set('x-csrftoken', csrfToken);
    const token = (getState() as RootState).auth.accessToken;
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
  const url = typeof args === 'string' ? args : args.url;
  const excludeFromReauth = ['accounts/auth/jwt/create/'];
  if (!excludeFromReauth.includes(url) && result.error?.status === 401) {
    if (!reauthMutex.isLocked()) {
      const release = await reauthMutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url:'accounts/auth/jwt/refresh/',
            method: 'POST',
          }, api, extraOptions
        );
        if (refreshResult.data) {
          const {
            access: accessToken,
          } = refreshResult.data as { access: string };
          api.dispatch(setAccessToken(accessToken));
          result = await baseQuery(args, api, extraOptions);
        }
      } finally {
        release();
      }
    } else {
      await reauthMutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Account', 'Category', 'Transaction'],
  endpoints: builder => ({
    getAccount: builder.query<Account, void>({
      query: () => 'accounts/auth/users/me/',
      providesTags: ['Account'],
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => 'categories/?limit=99999',
      providesTags: ['Category'],
      transformResponse: (response: PaginatedResponse<Category>) => 
        response.results,
    }),
    getCategories: builder.query<PaginatedResponse<Category>, number>({
      query: (pageNumber = 1) =>
        `categories/?${getPaginationQuery(pageNumber)}`,
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query<Category, number>({
      query: categoryId => `categories/${categoryId}/`,
      providesTags: ['Category'],
    }),
    getTransactions: builder.query<PaginatedResponse<Transaction>, number>({
      query: (pageNumber = 1) => 
        `transactions/?${getPaginationQuery(pageNumber)}`,
      providesTags: ['Transaction'],
    }),
    login: builder.mutation<JwtToken, LoginRequest>({
      query: credentials => ({
        url: 'accounts/auth/jwt/create/',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Account', 'Category', 'Transaction'],
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
  useGetAccountQuery,
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetTransactionsQuery,
  useLoginMutation,
  useRegisterMutation,
} = api;
