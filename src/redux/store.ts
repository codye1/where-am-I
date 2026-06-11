import {
  combineReducers,
  configureStore,
  type Action,
  type ThunkDispatch,
} from '@reduxjs/toolkit';
import { globalSlice } from './global';
import api from '../api/api';

export const rootReducer = combineReducers({
  global: globalSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
