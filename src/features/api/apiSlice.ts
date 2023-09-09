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
import { API_PATHS, EXCLUDE_FROM_REAUTH } from './constants';

const reauthMutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
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
        api.dispatch(setToken(accessToken));
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

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => API_PATHS.getCategories,
    }),
    login: builder.mutation<JwtToken, LoginRequest>({
      query: credentials => ({
        url: API_PATHS.createToken,
        method: 'POST',
        body: credentials,
      }),
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

export const {
  useLoginMutation,
  useRegisterMutation,
} = api;
