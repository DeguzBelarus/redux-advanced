import { combineReducers, configureStore } from '@reduxjs/toolkit';

import mainReducer from './reducers/mainSlice';
import { userApi } from './services/userService';

const rootReducer = combineReducers({
  main: mainReducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(userApi.middleware)
    },
  })
};

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReturnType<typeof setupStore>;
export type AppDispatch = Store['dispatch'];
