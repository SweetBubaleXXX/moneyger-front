import { configureStore } from '@reduxjs/toolkit';
import { api } from './features/api/apiSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
