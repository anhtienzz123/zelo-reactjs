import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import friendApi from 'api/friendApi';
const KEY = 'friend';

export const fetchListRequestFriend = createAsyncThunk(
    `${KEY}/fetchListRequestFriend`,
    async (params, thunkApi) => {
        const data = await friendApi.fetchListRequestFriend();
        return data;
    }
)

// export const fetchListMyRequestFriend = createAsyncThunk(
//     `${KEY}/fetchListMyRequestFriend`,
//     async (params, thunkApi) => {
//         const data = await friendApi.;
//         return data;
//     }

const friendSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        requestFriends: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
    extraReducers: {
        [fetchListRequestFriend.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.requestFriends = action.payload;
        },
        [fetchListRequestFriend.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListRequestFriend.rejected]: (state, action) => {
            state.isLoading = false;
        }
    },
});

const { reducer, actions } = friendSlice;
export const { setLoading } = actions;

export default reducer;
