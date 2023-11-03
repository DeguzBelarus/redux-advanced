import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IMainState, IUser } from '../types';
import { RootState } from '../store';
import { fetchUsersAsync } from './actionCreators';

const initialState: IMainState = {
  users: [],
  isLoading: false,
  error: '',
  count: 0,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    incrementCount(state, { payload }) {
      state.count += payload;
    },
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, { payload }: PayloadAction<Array<IUser>>) {
      state.isLoading = false;
      state.error = '';
      state.users = payload;
    },
    usersFetchingError(state, { payload }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersAsync.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.users = payload || [];
      })
      .addCase(fetchUsersAsync.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || '';
      });
  },
});

export const {
  actions: {
    incrementCount,
    usersFetching,
    usersFetchingSuccess,
    usersFetchingError,
  }
} = mainSlice;

export const getUsers = ({ main: { users } }: RootState) => users;
export const getIsLoading = ({ main: { isLoading } }: RootState) => isLoading;
export const getError = ({ main: { error } }: RootState) => error;
export const getCount = ({ main: { count } }: RootState) => count;

export default mainSlice.reducer;