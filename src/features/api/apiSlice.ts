import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import {
  createApi,
} from '@reduxjs/toolkit/query/react';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

import { API_PATHS } from './constants';
import { baseQueryWithReauth } from './queries';
import {
  Account,
  Category,
  CategoryCreateRequest,
  CategoryUpdateRequest,
  JwtToken,
  LoginRequest,
  PaginatedCategoryRequest,
  PaginatedResponse,
  PaginatedTransactionRequest,
  RegistrationRequest,
  RegistrationResponse,
  SubcategoryCreateRequest,
  Summary,
  Transaction,
  TransactionCreateUpdateRequest,
  TransactionMutationParams,
  TransactionRequestParams,
} from './types';

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
        if (!request.arg.page || request.arg.page === 1) {
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
    createCategory: builder.mutation<Category, CategoryCreateRequest>({
      query: request => ({
        url: API_PATHS.createCategory,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Category'],
    }),
    createSubcategory: builder.mutation<
      Category, SubcategoryCreateRequest & { id: number }
    >({
      query: request => ({
        url: API_PATHS.getSubcategories(request.id),
        method: 'POST',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<
      Category, CategoryUpdateRequest & { id: number }
    >({
      query: request => ({
        url: API_PATHS.getCategoryById(request.id),
        method: 'PATCH',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Category'],
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

export const filterCategoriesSelector = createSelector(
  (categories?: Category[]) => categories,
  (_: any, filter?: (category: Category) => boolean) => filter || (() => true),
  (data, filter) => data?.filter(filter)
);

export const {
  useGetAccountQuery,
  useGetAllCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
  useCreateCategoryMutation,
  useCreateSubcategoryMutation,
  useUpdateCategoryMutation,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useLoginMutation,
  useRegisterMutation,
} = api;
