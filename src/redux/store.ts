import { taskApi } from '../services/taskService';
import filter from './filter/slice';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter, [taskApi.reducerPath]: taskApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
