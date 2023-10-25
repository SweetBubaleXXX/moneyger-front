import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthState } from '../api/types';

export const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        accessToken: payload,
      };
    },
    clearToken: () => initialState,
  },
});

export const {
  setAccessToken,
  clearToken,
} = authSlice.actions;
