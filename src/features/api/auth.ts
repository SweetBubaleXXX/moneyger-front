import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState } from './types';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {} as AuthState,
  reducers: {
    setAccessToken: (state, { payload }: PayloadAction<string>) => {
      return { ...state, accessToken: payload };
    },
  },
});

export const { setAccessToken } = authSlice.actions;
