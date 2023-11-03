import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import { usersFetching, usersFetchingSuccess, usersFetchingError } from './mainSlice';
import { USERS_URL } from '../constants';

// general async dispatch
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(usersFetching());
    const getUsersResponse = await fetch(USERS_URL);
    dispatch(usersFetchingSuccess(await getUsersResponse.json()));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(usersFetchingError(error.message))
    }
  }
};

// thunk middleware async dispatch
export const fetchUsersAsync = createAsyncThunk(
  'main/get-users',
  async (_, thunkApi) => {
    try {
      const getUsersResponse = await fetch(USERS_URL);
      return await getUsersResponse.json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkApi.rejectWithValue(error.message)
      }
    }
  }
);
