import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: null as string | null,
  reducers: {
    setToken: (state, { payload } : PayloadAction<string>) => {
      state = payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
