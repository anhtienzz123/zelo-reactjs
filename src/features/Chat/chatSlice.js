import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import conversationApi from 'api/conversationApi';
import messageApi from 'api/messageApi';
import dateUtils from 'utils/dateUtils';

const KEY = 'chat';

export const fetchListConversations = createAsyncThunk(
    `${KEY}/fetchListConversations`,
    async (params, thunkApi) => {
        const { name, type } = params;
        const conversations = await conversationApi.fetchListConversations(
            name,
            type
        );

        return conversations;
    }
);

export const fetchListMessages = createAsyncThunk(
    `${KEY}/fetchListMessages`,
    async (params, thunkApi) => {
        const { conversationId, page, size } = params;

        const messages = await messageApi.fetchListMessages(
            conversationId,
            page,
            size
        );

        return {
            messages,
            conversationId,
        };
    }
);

const chatSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        conversations: [],
        messagesPage: {},
        currentConversation: '',
        messages: [],
    },
    reducers: {
        addMessage: (state, action) => {
            const newMessage = action.payload;

            const { conversationId } = newMessage;
            // tìm conversation
            const index = state.conversations.findIndex(
                (conversationEle) => conversationEle._id === conversationId
            );
            const seachConversation = state.conversations[index];

            seachConversation.numberUnread = seachConversation.numberUnread + 1;
            seachConversation.lastMessage = {
                ...newMessage,
                createdAt: dateUtils.toTime(newMessage.createdAt),
            };
            // xóa conversation đó ra
            const conversationTempt = state.conversations.filter(
                (conversationEle) => conversationEle._id !== conversationId
            );

            if (conversationId === state.currentConversation) {
                state.messages.push(action.payload);
                seachConversation.numberUnread = 0;
            }

            state.conversations = [seachConversation, ...conversationTempt];
        },
    },
    extraReducers: {
        [fetchListConversations.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListConversations.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.conversations = action.payload;
        },
        [fetchListMessages.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListMessages.fulfilled]: (state, action) => {
            state.isLoading = false;

            // xét currentConversation
            const conversationId = action.payload.conversationId;
            const conversationIndex = state.conversations.findIndex(
                (conversationEle) => conversationEle._id === conversationId
            );
            state.conversations[conversationIndex] = {
                ...state.conversations[conversationIndex],
                numberUnread: 0,
            };
            state.currentConversation = conversationId;

            state.messagesPage = action.payload.messages;
            state.messages = action.payload.messages.data;
        },
    },
});

const { reducer, actions } = chatSlice;
export const { addMessage } = actions;

export default reducer;
