import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';
import Cookies from 'js-cookie';

import { RootState } from '../../store';
import { setAccessToken } from './auth';
import { API_PATHS, EXCLUDE_FROM_REAUTH } from './constants';
import {
  Account,
  Category,
  JwtToken,
  LoginRequest,
  PaginatedCategoryRequest,
  PaginatedResponse,
  PaginatedTransactionRequest,
  RegistrationRequest,
  RegistrationResponse,
  Summary,
  Transaction,
  TransactionCreateUpdateRequest,
  TransactionMutationParams,
  TransactionRequestParams,
} from './types';

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

const reauthMutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, unknown, FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await reauthMutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  const url = typeof args === 'string' ? args : args.url;
  if (EXCLUDE_FROM_REAUTH.includes(url) || result.error?.status !== 401) {
    return result;
  }
  if (!reauthMutex.isLocked()) {
    const release = await reauthMutex.acquire();
    try {
      const refreshResult = await baseQuery(
        {
          url: API_PATHS.refreshToken,
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
  return result;
};

export const transactionsAdapter = createEntityAdapter<Transaction>({
  selectId: transaction => transaction.id,
});

export const transactionsSelector = transactionsAdapter.getSelectors();

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Account', 'Category', 'Transaction'],
  endpoints: builder => ({
    getAccount: builder.query<Account, void>({
      query: () => API_PATHS.getAccount,
      providesTags: ['Account'],
      transformResponse: (response: Account) => camelcaseKeys(response),
    }),
    getAllCategories: builder.query<Category[], void>({
      query: () => API_PATHS.getAllCategories,
      providesTags: ['Category'],
      transformResponse: (response: PaginatedResponse<Category[]>) =>
        camelcaseKeys(response.results),
    }),
    getCategories: builder
      .query<PaginatedResponse<Category>, PaginatedCategoryRequest>({
        query: request => ({
          url: API_PATHS.getCategories(request.page),
          params: request.params,
        }),
        providesTags: ['Category'],
      }),
    getCategoryById: builder.query<Category, number>({
      query: API_PATHS.getCategoryById,
      providesTags: ['Category'],
    }),
    getTransactions: builder.query<
      PaginatedResponse<EntityState<Transaction>>,
      PaginatedTransactionRequest
    >({
      query: request => ({
        url: API_PATHS.getTransactions(request.page),
        params: decamelizeKeys(request.params),
      }),
      serializeQueryArgs: ({ queryArgs }) => queryArgs.params,
      transformResponse: (response: PaginatedResponse<Transaction[]>) => ({
        count: response.count,
        results: transactionsAdapter.addMany(
          transactionsAdapter.getInitialState(),
          camelcaseKeys(response.results),
        ),
      }),
      merge: (currentState, response, request) => {
        currentState.count = response.count;
        if ((request.arg.page ?? 1) === 1) {
          transactionsAdapter.setAll(
            currentState.results,
            transactionsSelector.selectAll(response.results)
          );
        } else {
          transactionsAdapter.setMany(
            currentState.results,
            transactionsSelector.selectAll(response.results)
          );
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ['Transaction'],
    }),
    getTransactionsSummary: builder.query<Summary, TransactionRequestParams>({
      query: request => ({
        url: API_PATHS.getTransactionsSummary,
        params: decamelizeKeys(request),
      }),
      providesTags: ['Transaction'],
    }),
    createTransaction: builder
      .mutation<Transaction, TransactionCreateUpdateRequest>({
        query: request => ({
          url: API_PATHS.createTransaction(request.category),
          method: 'POST',
          body: decamelizeKeys(request),
        }),
        invalidatesTags: ['Transaction'],
      }),
    updateTransaction: builder.mutation<
      Transaction, TransactionCreateUpdateRequest & TransactionMutationParams
    >({
      query: request => ({
        url: API_PATHS.getTransactionById(request.id),
        method: 'PUT',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Transaction'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const updateResult = await queryFulfilled;
        if (!arg.params) { return; }
        dispatch(
          api.util.updateQueryData('getTransactions', arg.params, draft => {
            transactionsAdapter.setOne(draft.results, updateResult.data);
          })
        );
      },
    }),
    deleteTransaction: builder
      .mutation<any, TransactionMutationParams>({
        query: request => ({
          url: API_PATHS.getTransactionById(request.id),
          method: 'DELETE',
        }),
        invalidatesTags: ['Transaction'],
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          if (!arg.params) { return; }
          const deleteResult = dispatch(
            api.util.updateQueryData('getTransactions', arg.params, draft => {
              transactionsAdapter.removeOne(draft.results, arg.id);
            })
          );
          try {
            await queryFulfilled;
          } catch {
            deleteResult.undo();
          }
        },
      }),
    login: builder.mutation<JwtToken, LoginRequest>({
      query: credentials => ({
        url: API_PATHS.createToken,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Account', 'Category', 'Transaction'],
    }),
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: body => ({
        url: API_PATHS.registerAccount,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const selectCategoryById = createSelector(
  (categories?: Category[]) => categories,
  (_: any, categoryId?: number) => categoryId,
  (data, categoryId) =>
    categoryId ? data?.find(category => category.id === categoryId) : undefined,
);

export const {
  useGetAccountQuery,
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useLoginMutation,
  useRegisterMutation,
} = api;
