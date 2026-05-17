import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from './action';
import { globalSlice } from './global/slice';
import { Slice, type State } from './slice';

// ✅ Define rootReducer FIRST
const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;

export { setupStore, useAppDispatch, useTypedSelector, Action, Slice };
export type { State };