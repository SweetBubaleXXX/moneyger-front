import {
  createEntityAdapter,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import {
  createApi,
} from '@reduxjs/toolkit/query/react';
import {
  PublicKeyCredentialCreationOptionsJSON,
} from '@simplewebauthn/typescript-types';
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
  GetWebauthnSignupOptionsRequest,
  JwtToken,
  LoginRequest,
  PaginatedResponse,
  PaginatedTransactionRequest,
  PasswordResetRequest,
  RegistrationRequest,
  RegistrationResponse,
  SetPasswordRequest,
  Stats,
  StatsRequestParams,
  SubcategoryCreateRequest,
  Summary,
  Transaction,
  TransactionCreateUpdateRequest,
  TransactionMutationParams,
  TransactionRequestParams,
  WebauthnSignupRequest,
  WebauthnSignupResponse,
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
    getCategories: builder.query<Category[], void>({
      query: () => API_PATHS.getCategories,
      providesTags: ['Account', 'Category'],
      transformResponse: (response: Category[]) => camelcaseKeys(response),
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
      providesTags: ['Account', 'Category', 'Transaction'],
    }),
    getTransactionsSummary: builder.query<Summary, TransactionRequestParams>({
      query: request => ({
        url: API_PATHS.getTransactionsSummary,
        params: decamelizeKeys(request),
      }),
      providesTags: ['Account', 'Category', 'Transaction'],
    }),
    getCategoriesStats: builder.query<Stats, StatsRequestParams>({
      query: request => ({
        url: API_PATHS.getCategoriesStats,
        params: decamelizeKeys(request),
      }),
      transformResponse: (response: Stats) => ({
        ...response,
        categories: response.categories.sort(
          (a, b) => Math.abs(b.total) - Math.abs(a.total)
        ),
      }),
      providesTags: ['Account', 'Category', 'Transaction'],
    }),
    updateAccount: builder.mutation<
      Account, AccountUpdateRequest & { id: number }
    >({
      query: request => ({
        url: API_PATHS.getAccountById(request.id),
        method: 'PATCH',
        body: decamelizeKeys(request),
      }),
      invalidatesTags: ['Account', 'Category', 'Transaction'],
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
    updateDisplayOrder: builder.mutation<void, Category[]>({
      queryFn: async (categories, api, extraOptions, baseQuery) => {
        const requests = [];
        for (const [index, category] of categories.entries()) {
          const newDisplayOrder = index + 1;
          if (category.displayOrder === newDisplayOrder) { continue; }
          const query = baseQuery({
            url: API_PATHS.getCategoryById(category.id),
            method: 'PATCH',
            body: decamelizeKeys({
              displayOrder: newDisplayOrder,
            }),
          });
          requests.push(query);
        }
        await Promise.all(requests);
        return { data: void {} };
      },
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: categoryId => ({
        url: API_PATHS.getCategoryById(categoryId),
        method: 'DELETE',
      }),
      invalidatesTags: ['Category', 'Transaction'],
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
    importJson: builder.mutation<void, object>({
      query: request => ({
        url: API_PATHS.importJson,
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['Category', 'Transaction'],
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
    logout: builder.mutation<void, void>({
      query: () => ({
        url: API_PATHS.logout,
        method: 'POST',
      }),
    }),
    getWebauthnSignupOptions: builder.mutation<
      PublicKeyCredentialCreationOptionsJSON, GetWebauthnSignupOptionsRequest
    >({
      query: request => ({
        url: API_PATHS.webauthnSignupRequest,
        method: 'POST',
        body: decamelizeKeys({
          username: request.username,
          displayName: request.username,
        }),
      }),
    }),
    webauthnSignup: builder.mutation<
      WebauthnSignupResponse, WebauthnSignupRequest
    >({
      query: request => ({
        url: API_PATHS.webauthnSignup(request.userId),
        method: 'POST',
        body: {
          username: request.username,
          email: request.email,
          attObj: request.attestationObject,
          clientData: request.clientDataJSON,
        },
      }),
    }),
    activateAccount: builder.mutation<void, AccountActivationRequest>({
      query: request => ({
        url: API_PATHS.activateAccount,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
    }),
    changePassword: builder.mutation<void, SetPasswordRequest>({
      query: request => ({
        url: API_PATHS.setPassword,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
    }),
    resetPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: request => ({
        url: API_PATHS.resetPassword,
        method: 'POST',
        body: decamelizeKeys(request),
      }),
    }),
    resetPasswordConfirm: builder.mutation<void, PasswordResetRequest>({
      query: request => ({
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
  useGetCategoriesQuery,
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
  useGetCategoriesStatsQuery,
  useUpdateAccountMutation,
  useCreateCategoryMutation,
  useCreateSubcategoryMutation,
  useUpdateCategoryMutation,
  useUpdateDisplayOrderMutation,
  useDeleteCategoryMutation,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetWebauthnSignupOptionsMutation,
  useWebauthnSignupMutation,
  useActivateAccountMutation,
  useImportJsonMutation,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
} = api;
