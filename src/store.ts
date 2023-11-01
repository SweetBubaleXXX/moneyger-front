import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { api } from './features/api/apiSlice';
import { chatApi } from './features/api/chatApiSlice';
import { authSlice } from './features/auth/authSlice';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    [api.reducerPath]: api.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware).concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
