import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import conversationApi from 'api/conversationApi';
import messageApi from 'api/messageApi';
import dateUtils from 'utils/dateUtils';
import friendApi from 'api/friendApi';
import { ConsoleSqlOutlined } from '@ant-design/icons';

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


export const fetchNextPageMessage = createAsyncThunk(
    `${KEY}/fetchNextPageMessage`,
    async (params, thunkApi) => {
        const { conversationId, page, size } = params;

        const messages = await messageApi.fetchListMessages(
            conversationId,
            page,
            size
        );

        return {
            messages,
        };
    }
);

// FRIEND API


export const fetchListFriends = createAsyncThunk(
    `${KEY}/fetchListFriends`,
    async (params, thunkApi) => {
        const { name } = params;

        const friends = await friendApi.fetchFriends(name);
        return friends;
    }
);



// CONVERSATION API

// Create a group chat
export const createGroup = createAsyncThunk(
    `${KEY}/createGroup`,
    async (params, thunkApi) => {
        const { name, userIds } = params;
        const idNewGroup = await conversationApi.createGroup(name, userIds);
        return idNewGroup;
    }
);


export const fetchConversationById = createAsyncThunk(
    `${KEY}/fetchConversationById`,
    async (params, thunkApi) => {
        const { conversationId } = params;
        const conversation = await conversationApi.getConversationById(conversationId);
        return conversation;
    }
);

export const deleteConversation = createAsyncThunk(
    `${KEY}/deleteConversation/`,
    async (params, thunkApi) => {
        const { conversationId } = params;
        await conversationApi.deleteConversation(conversationId);
        return conversationId;
    }
)

export const getMembersConversation = createAsyncThunk(
    `${KEY}/getMembersConversation`,
    async (params, thunkApi) => {
        const { conversationId } = params;
        const members = await conversationApi.getMemberInConversation(conversationId);
        return members;
    }
)




const chatSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        conversations: [],
        // messagesPage: {},
        currentConversation: '',
        messages: [],
        friends: [],
        memberInConversation: [],
        type: false,
        currentPage: '',
        totalPages: ''

    },
    reducers: {
        addMessage: (state, action) => {
            const newMessage = action.payload;

            const { conversationId } = newMessage;
            // tìm conversation
            const index = state.conversations.findIndex(
                (conversationEle) =>
                    conversationEle._id === conversationId
            );

            const test = state.conversations
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
        setRaisePage: (state, action) => {
            if (state.currentPage < state.totalPages - 1) {
                state.currentPage = state.currentPage + 1
            }
        },


        setFriends: (state, action) => {
            state.friends = action.payload;
        },

        removeConversation: (state, action) => {
            const conversationId = action.payload;
            const newConversations = state.conversations.filter(ele => ele._id !== conversationId);
            state.conversations = newConversations;
        },

        setTypeOfConversation: (state, action) => {
            const conversationId = action.payload;
            const conversation = state.conversations.find(ele => ele._id === conversationId);
            state.type = conversation.type;

        }
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

            // state.messagesPage = action.payload.messages;
            state.messages = action.payload.messages.data;
            state.currentPage = action.payload.messages.page;
            state.totalPages = action.payload.messages.totalPages;
        },
        [fetchNextPageMessage.fulfilled]: (state, action) => {


            console.log("data check", action.payload);
            state.messages = [...action.payload.messages.data, ...state.messages];
            state.currentPage = action.payload.messages.page;

        }
        ,

        // FRIEND
        [fetchListFriends.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListFriends.fulfilled]: (state, action) => {
            state.friends = action.payload;
            state.isLoading = false;
        },


        // Conversation

        [fetchConversationById.fulfilled]: (state, action) => {
            const conversations = action.payload;
            state.conversations = [conversations, ...state.conversations];

        },

        [getMembersConversation.fulfilled]: (state, action) => {

            const tempMembers = [...action.payload];
            const temp = [];

            tempMembers.forEach(member => {
                state.friends.forEach(friend => {
                    if (member._id == friend._id) {
                        member = { ...member, isFriend: true };
                        return;
                    }

                })
                temp.push(member);
            });

            state.memberInConversation = temp;
        },




    },
});

const { reducer, actions } = chatSlice;
export const { addMessage, setFriends, removeConversation, setTypeOfConversation, setRaisePage } = actions;

export default reducer;
