import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';
import { Mutex } from 'async-mutex';

import { RootState } from '../../store';
import { setAccessToken } from '../auth/authSlice';
import { getAuthHeaders } from '../auth/headers';
import { API_PATHS, EXCLUDE_FROM_REAUTH } from './constants';


export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const authHeaders = getAuthHeaders(state.auth);
    for (const [header, value] of Object.entries(authHeaders)) {
      headers.set(header, value);
    }
    return headers;
  },
  credentials: 'include',
});

const reauthMutex = new Mutex();

export const baseQueryWithReauth: BaseQueryFn<
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
        } = refreshResult.data as { access: string; };
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
