import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const KEY = 'friend';

const friendSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {},
});

const { reducer, actions } = friendSlice;
export const { setLoading } = actions;

export default reducer;
