import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

import { API_PATHS } from './constants';
import { baseQueryWithReauth } from './queries';
import {
  Account,
  AccountActivationRequest,
  AccountUpdateRequest,
  Category,
  CategoryCreateRequest,
  CategoryUpdateRequest,
  ForgotPasswordRequest,
  JwtToken,
  LoginRequest,
  PaginatedResponse,
  PasswordResetRequest,
  PeriodSummary,
  RegistrationRequest,
  RegistrationResponse,
  SetPasswordRequest,
  SubcategoryCreateRequest,
  Tag,
  TagCreateRequest,
  Transaction,
  TransactionFilterRequest,
  TransactionMutationParams,
  TransactionUpsertRequest,
} from './types';

export const transactionsAdapter = createEntityAdapter<Transaction>({
  selectId: (transaction) => transaction.id,
});

export const transactionsSelector = transactionsAdapter.getSelectors();

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Account', 'Category', 'Transaction', 'Tag'],
  endpoints: (builder) => ({
    getAccount: builder.query<Account, void>({
      query: () => API_PATHS.account,
      providesTags: ['Account'],
      transformResponse: (response: Account) => camelcaseKeys(response),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => API_PATHS.categories,
      providesTags: ['Account', 'Category'],
      transformResponse: (response: Category[]) => camelcaseKeys(response),
    }),
    getTransactions: builder.query<PaginatedResponse<EntityState<Transaction>>, TransactionFilterRequest>({
      query: (request) => ({
        url: API_PATHS.transactions(request.page),
        params: decamelizeKeys(request),
      }),
      transformResponse: (response: PaginatedResponse<Transaction[]>) => ({
        resultLength: response.resultLength,
        result: transactionsAdapter.addMany(transactionsAdapter.getInitialState(), camelcaseKeys(response.result)),
      }),
      merge: (currentState, response, request) => {
        currentState.resultLength = response.resultLength;
        if (!request.arg.page || request.arg.page === 1) {
          transactionsAdapter.setAll(currentState.result, transactionsSelector.selectAll(response.result));
        } else {
          transactionsAdapter.setMany(currentState.result, transactionsSelector.selectAll(response.result));
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ['Account', 'Category', 'Transaction'],
    }),
    getTags: builder.query<Tag[], void>({
      query: () => API_PATHS.tags,
      providesTags: ['Account', 'Tag'],
      transformResponse: (response: Tag[]) => camelcaseKeys(response),
    }),
    getSummary: builder.query<PeriodSummary, TransactionFilterRequest>({
      query: (request) => ({
        url: API_PATHS.stats,
        params: decamelizeKeys(request),
      }),
      transformResponse: (response: PeriodSummary) => camelcaseKeys(response),
      providesTags: ['Account', 'Category', 'Transaction'],
    }),
    updateAccount: builder.mutation<Account, AccountUpdateRequest & { id: number }>({
      query: (request) => ({
        url: API_PATHS.accountById(request.id),
        method: 'PATCH',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Account', 'Category', 'Transaction'],
    }),
    createCategory: builder.mutation<Category, CategoryCreateRequest>({
      query: (request) => ({
        url: API_PATHS.categories,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Category'],
    }),
    createSubcategory: builder.mutation<Category, SubcategoryCreateRequest & { id: number }>({
      query: (request) => ({
        url: API_PATHS.subcategories(request.id),
        method: 'POST',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<Category, CategoryUpdateRequest & { id: number }>({
      query: (request) => ({
        url: API_PATHS.categoryById(request.id),
        method: 'PATCH',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Category'],
    }),
    updateDisplayOrder: builder.mutation<void, Category[]>({
      queryFn: async (categories, api, extraOptions, baseQuery) => {
        const updates = [];
        for (const [index, category] of categories.entries()) {
          const newDisplayOrder = index + 1;
          if (category.displayOrder === newDisplayOrder) {
            continue;
          }
          updates.push({ id: category.id, displayOrder: newDisplayOrder });
        }
        await baseQuery({
          url: API_PATHS.categoryOrder,
          method: 'POST',
          body: decamelizeKeys(updates),
        });
        return { data: void {} };
      },
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (categoryId) => ({
        url: API_PATHS.categoryById(categoryId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Category', 'Transaction'],
    }),
    createTransaction: builder.mutation<Transaction, TransactionUpsertRequest>({
      query: (request) => ({
        url: API_PATHS.createTransaction(request.categoryId),
        method: 'POST',
        body: decamelizeKeys({ ...request, comment: request.comment }),
      }),
      invalidatesTags: ['Transaction'],
    }),
    updateTransaction: builder.mutation<Transaction, TransactionUpsertRequest & TransactionMutationParams>({
      query: (request) => ({
        url: API_PATHS.transactionById(request.id),
        method: 'PATCH',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Transaction'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        if (!arg.params) {
          return;
        }
        dispatch(
          api.util.updateQueryData('getTransactions', arg.params, (draft) => {
            const transaction = {
              categoryId: arg.categoryId,
              amountCents: arg.amountCents,
              comment: arg.comment,
              timestamp: arg.timestamp?.toString(),
            };
            transactionsAdapter.updateOne(draft.result, {
              id: arg.id,
              changes: { ...transaction },
            });
          }),
        );
      },
    }),
    deleteTransaction: builder.mutation<any, TransactionMutationParams>({
      query: (request) => ({
        url: API_PATHS.transactionById(request.id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        if (!arg.params) {
          return;
        }
        const deleteResult = dispatch(
          api.util.updateQueryData('getTransactions', arg.params, (draft) => {
            transactionsAdapter.removeOne(draft.result, arg.id);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          deleteResult.undo();
        }
      },
    }),
    createTag: builder.mutation<void, TagCreateRequest>({
      query: (request) => ({
        url: API_PATHS.tags,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Tag'],
    }),
    deleteTag: builder.mutation<void, number>({
      query: (request) => ({
        url: API_PATHS.tagById(request),
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction', 'Tag'],
    }),
    login: builder.mutation<JwtToken, LoginRequest>({
      query: (credentials) => ({
        url: API_PATHS.createToken,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Account', 'Category', 'Transaction'],
    }),
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (body) => ({
        url: API_PATHS.registerAccount,
        method: 'POST',
        body,
      }),
    }),
    activateAccount: builder.mutation<void, AccountActivationRequest>({
      query: (request) => ({
        url: API_PATHS.activateAccount,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_PATHS.logout,
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation<void, SetPasswordRequest>({
      query: (request) => ({
        url: API_PATHS.setPassword,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
    }),
    resetPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: (request) => ({
        url: API_PATHS.resetPassword,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
    }),
    resetPasswordConfirm: builder.mutation<void, PasswordResetRequest>({
      query: (request) => ({
        url: API_PATHS.resetPasswordConfirm,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
    }),
  }),
});

export const selectCategoryById = createSelector(
  (categories?: Category[]) => categories,
  (_: any, categoryId?: number) => categoryId,
  (data, categoryId) => (categoryId ? data?.find((category) => category.id === categoryId) : undefined),
);

export const filterCategoriesSelector = createSelector(
  (categories?: Category[]) => categories,
  (_: any, filter?: (category: Category) => boolean) => filter || (() => true),
  (data, filter) => data?.filter(filter),
);

export const {
  useGetAccountQuery,
  useGetCategoriesQuery,
  useGetTransactionsQuery,
  useGetTagsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
  useUpdateAccountMutation,
  useCreateCategoryMutation,
  useCreateSubcategoryMutation,
  useUpdateCategoryMutation,
  useUpdateDisplayOrderMutation,
  useDeleteCategoryMutation,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useActivateAccountMutation,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useGetSummaryQuery,
} = api;
