import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import friendApi from 'api/friendApi';
import conversationApi from 'api/conversationApi';
const KEY = 'friend';

export const fetchListRequestFriend = createAsyncThunk(
    `${KEY}/fetchListRequestFriend`,
    async (params, thunkApi) => {
        const data = await friendApi.fetchListRequestFriend();
        return data;
    }
)

export const fetchListMyRequestFriend = createAsyncThunk(
    `${KEY}/fetchListMyRequestFriend`,
    async (params, thunkApi) => {
        const data = await friendApi.fetchMyRequestFriend();
        return data;
    }
)

export const fetchFriends = createAsyncThunk(
    `${KEY}/fetchFriends`,
    async (params, thunkApi) => {
        const { name } = params;
        const data = await friendApi.fetchFriends(name);
        return data;
    }
)
export const fetchListGroup = createAsyncThunk(
    `${KEY}/fetchListGroup`,
    async (param, thunkApi) => {
        const { name, type } = param;
        const data = await conversationApi.fetchListConversations(name, type);
        return data;

    }
)



const friendSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        requestFriends: [],
        myRequestFriend: [],
        friends: [],
        groups: []
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setNewFriend: (state, action) => {
            const newFriend = action.payload;
            state.friends = [newFriend, ...state.friends];
        },
        setNewRequestFriend: (state, action) => {
            const newRequestFriend = action.payload;
            state.requestFriends = [newRequestFriend, ...state.requestFriends];

        },

        setGroup: (state, action) => {
            const conversationId = action.payload;
            const newGroup = state.groups.filter(
                (ele) => ele._id !== conversationId
            );
            state.groups = newGroup;
        },
        setMyRequestFriend: (state, action) => {
            state.myRequestFriend = state.myRequestFriend.filter(ele => ele._id !== action.payload);
        }
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
        },
        [fetchListMyRequestFriend.fulfilled]: (state, action) => {
            state.myRequestFriend = action.payload;
        },
        [fetchFriends.fulfilled]: (state, action) => {
            state.friends = action.payload;
        },
        [fetchListGroup.fulfilled]: (state, action) => {
            state.groups = action.payload;
        }
    },
});

const { reducer, actions } = friendSlice;
export const { setLoading,
    setNewFriend,
    setNewRequestFriend,
    setGroup,
    setMyRequestFriend } = actions;

export default reducer;
