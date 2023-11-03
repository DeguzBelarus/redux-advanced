import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { BASE_URL, USERS_ENDPOINT } from '../constants';
import { HttpMethodsEnum, IUser } from '../types';

// redux toolkit query middleware async dispatch
export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    fetchUsers: build.query<Array<IUser>, number>({
      query: (limit = 5) => ({
        url: USERS_ENDPOINT,
        params: {
          _limit: limit,
        }
      }),
      providesTags: (result) => ['User'],
    }),
    addUser: build.mutation<Array<IUser>, IUser>({
      query: (user) => ({
        url: USERS_ENDPOINT,
        method: HttpMethodsEnum.POST,
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: build.mutation<Array<IUser>, IUser>({
      query: (user) => ({
        url: `${USERS_ENDPOINT}/${user.id}`,
        method: HttpMethodsEnum.PUT,
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: build.mutation<Array<IUser>, number>({
      query: (userId: number) => ({
        url: `${USERS_ENDPOINT}/${userId}`,
        method: HttpMethodsEnum.DELETE,
      }),
      invalidatesTags: ['User'],
    }),
  })
});
