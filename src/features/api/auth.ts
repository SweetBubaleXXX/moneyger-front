import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const tokenSliceInitialState = '';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenSliceInitialState,
  reducers: {
    setToken: (state, { payload } : PayloadAction<string>) => {
      return payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
