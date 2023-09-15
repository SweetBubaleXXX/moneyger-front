import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './features/api/apiSlice';
import { authSlice } from './features/api/auth';

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
