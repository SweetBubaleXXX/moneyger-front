import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { JwtToken } from './types';

type JwtTokenState = Partial<JwtToken>;

export const jwtSlice = createSlice({
  name: 'jwtToken',
  initialState: {} as JwtTokenState,
  reducers: {
    setToken: (state, { payload } : PayloadAction<JwtToken>) => {
      state = payload;
    },
  },
});

export const { setToken: setJwtToken } = jwtSlice.actions;
