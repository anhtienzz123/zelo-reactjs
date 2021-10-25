import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import adminApi from 'api/adminApi';

const KEY = 'ADMIN';

export const fetchListUser = createAsyncThunk(
    `${KEY}/fetchListUsers`,
    async (params, thunkApi) => {
      const { page, size } = params;
      const users = await adminApi.getListUsers(page, size);
      return users;
    }
  );

const adminSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        users: [],
        blogsPage: {},
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {
        [fetchListUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.blogsPage = action.payload;
            state.users = action.payload.data;
          },
    },
});

const { reducer, actions } = adminSlice;
export const { setLoading } = actions;

export default reducer;
