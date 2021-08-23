import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const KEY = 'chat';

const chatSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
    },
    reducers: {},
    extraReducers: {},
});

const { reducer, actions } = chatSlice;

export default reducer;
