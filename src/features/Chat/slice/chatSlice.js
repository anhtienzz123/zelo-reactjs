import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ClassifyApi from 'api/ClassifyApi';
import conversationApi from 'api/conversationApi';
import friendApi from 'api/friendApi';
import messageApi from 'api/messageApi';
import dateUtils from 'utils/dateUtils';
import pinMessageApi from 'api/pinMessageApi';

const KEY = 'chat';

// Classify

export const fetchListColor = createAsyncThunk(
    `${KEY}/fetchListColor`,
    async (params, thunkApi) => {
        const colors = await ClassifyApi.getColors();
        return colors;
    }
);

export const fetchListClassify = createAsyncThunk(
    `${KEY}/fetchListClassify`,
    async (params, thunkApi) => {
        const classifies = await ClassifyApi.getClassifies();
        return classifies;
    }
);

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
        const conversation = await conversationApi.getConversationById(
            conversationId
        );

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
);

export const getMembersConversation = createAsyncThunk(
    `${KEY}/getMembersConversation`,
    async (params, thunkApi) => {
        const { conversationId } = params;
        const members = await conversationApi.getMemberInConversation(
            conversationId
        );
        return members;
    }
);

// ============ PIN MESSAGE ==============

export const fetchPinMessages = createAsyncThunk(
    `${KEY}/fetchPinMessages`,
    async (params, _) => {
        const { conversationId } = params;
        const pinMessages = await pinMessageApi.getPinMessages(conversationId);
        return pinMessages;
    }
);

// ============

// ============
export const getLastViewOfMembers = createAsyncThunk(
    `${KEY}/getLastViewOfMembers`,
    async (params, _) => {
        const { conversationId } = params;
        console.log('lastViewasdfasdfsdaf');
        const lastViews = await conversationApi.getLastViewOfMembers(
            conversationId
        );

        console.log('lastViews', lastViews);

        return lastViews;
    }
);

const chatSlice = createSlice({
    name: KEY,
    initialState: {
        isLoading: false,
        conversations: [],
        currentConversation: '',
        messages: [],
        friends: [],
        memberInConversation: [],
        type: false,
        currentPage: '',
        totalPages: '',
        toTalUnread: 0,
        classifies: [],
        colors: [],
        pinMessages: [],
        lastViewOfMember: [],
    },
    reducers: {
        addMessage: (state, action) => {
            const newMessage = action.payload;

            const { conversationId } = newMessage;
            // tìm conversation
            const index = state.conversations.findIndex(
                (conversationEle) => conversationEle._id === conversationId
            );

            const test = state.conversations;
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
                state.currentPage = state.currentPage + 1;
            }
        },

        setFriends: (state, action) => {
            state.friends = action.payload;
        },

        removeConversation: (state, action) => {
            const conversationId = action.payload;
            const newConversations = state.conversations.filter(
                (ele) => ele._id !== conversationId
            );
            state.conversations = newConversations;
            state.currentConversation = '';
        },

        setTypeOfConversation: (state, action) => {
            const conversationId = action.payload;
            const conversation = state.conversations.find(
                (ele) => ele._id === conversationId
            );
            state.type = conversation.type;
        },

        setRedoMessage: (state, action) => {
            const id = action.payload;
            // lấy mesage đã thu hồi
            const oldMessage = state.messages.find(
                (message) => message._id == id
            );
            const { _id, user, createdAt } = oldMessage;

            // lấy index của message
            const index = state.messages.findIndex(
                (message) => message._id == id
            );

            // tạo message mới
            const newMessage = {
                _id,
                user,
                createdAt,
                isDeleted: 'true',
            };
            // chèn vào vị trí index 'message đã thu hồi'
            state.messages[index] = newMessage;
        },
        deleteMessageClient: (state, action) => {
            const id = action.payload;
            const newMessages = state.messages.filter(
                (message) => message._id !== id
            );
            state.messages = newMessages;
        },

        setToTalUnread: (state, action) => {
            let tempCount = 0;
            state.conversations.forEach((ele, index) => {
                if (ele.numberUnread > 0) tempCount += 1;
            });
            state.toTalUnread = tempCount;
        },
        setReactionMessage: (state, action) => {
            const { messageId, user, type } = action.payload;

            const index = state.messages.findIndex(
                (message) => message._id === messageId
            );
            const currentMessage = state.messages.find(
                (message) => message._id === messageId
            );

            const checkIsExist = currentMessage.reacts.findIndex(
                (ele) => ele.user._id === user._id
            );
            //  có 2 trường hợp

            //  người dùng thả 1 react mới
            if (checkIsExist >= 0) {
                state.messages[index].reacts[checkIsExist] = {
                    ...state.messages[index].reacts[checkIsExist],
                    type,
                };
            } else {
                let reacts = [...currentMessage.reacts, { user, type }];
                state.messages[index].reacts = reacts;
            }
        },
        updateConversationWhenAddMember: (state, action) => {
            const { newMembers, conversationId } = action.payload;

            console.log('newMembers', newMembers);
            console.log('conversationId', conversationId);

            const index = state.conversations.findIndex(
                (ele) => ele._id === conversationId
            );
            const conversation = state.conversations.find(
                (ele) => ele._id === conversationId
            );

            console.log('Conversation avatar', conversation);

            // lấy ra vị trí, lấy ra giá trị
            // sau đó clone ra 1 mảng avatar ms và gán vào
            // lấy totalMember + newMember.lenght

            const avatar = [
                ...conversation.avatar,
                ...newMembers.map((ele) => ele.avatar),
            ];
            const totalMembers = conversation.totalMembers + newMembers.length;
            state.conversations[index] = {
                ...state.conversations[index],
                avatar,
                totalMembers,
            };

            const temp = [];
            newMembers.forEach((member) => {
                state.friends.forEach((friend) => {
                    if (member._id == friend._id) {
                        member = { ...member, isFriend: true };
                        return;
                    }
                });
                temp.push(member);
            });

            if (state.currentConversation === conversationId) {
                state.memberInConversation = [
                    ...state.memberInConversation,
                    ...temp,
                ];
            }
        },

        updateMemberLeaveGroup: (state, action) => {
            const { conversationId, newMessage } = action.payload;

            const index = state.conversations.findIndex(
                (ele) => ele._id === conversationId
            );
            const conversation = state.conversations.find(
                (ele) => ele._id === conversationId
            );

            const avatar = conversation.avatar.filter(
                (ele) => ele !== newMessage.user.avatar
            );

            const totalMembers = conversation.totalMembers - 1;
            state.memberInConversation = state.memberInConversation.filter(
                (ele) => ele._id !== newMessage.user._id
            );
            state.conversations[index] = {
                ...state.conversations[index],
                avatar,
                totalMembers,
            };
        },
        leaveGroup: (state, action) => {
            const conversationId = action.payload;
            const newConvers = state.conversations.filter(
                (ele) => ele._id !== conversationId
            );
            state.conversations = newConvers;
            state.currentConversation = '';
        },
        isDeletedFromGroup: (state, action) => {
            const idConver = action.payload;
            const newConver = state.conversations.filter(
                (ele) => ele._id !== idConver
            );
            state.conversations = newConver;
        },
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload;
        },
        updateClassifyToConver: (state, action) => {
            state.conversations = action.payload;
        },
        setConversations: (state, action) => {
            const conversation = action.payload;
            state.conversations = [conversation, ...state.conversations];
        },
        setNumberUnreadForNewFriend: (state, action) => {
            const id = action.payload;
            const index = state.conversations.findIndex(
                (ele) => ele._id === id
            );
            const numberUnread = state.conversations[index].numberUnread + 1;
            state.conversations[index] = {
                ...state.conversations[index],
                numberUnread,
            };
        },
        updateTimeForConver: (state, action) => {
            const { isOnline, id, lastLogin } = action.payload;
            const index = state.conversations.findIndex(
                (ele) => ele._id === id
            );
            const newConver = {
                ...state.conversations[index],
                isOnline,
                lastLogin,
            };
            state.conversations[index] = newConver;
        },
        updateNameOfConver: (state, action) => {
            const { conversationId, conversationName } = action.payload;
            console.log(conversationId, conversationName);
            const index = state.conversations.findIndex(
                (ele) => ele._id === conversationId
            );
            console.log(index);
            state.conversations[index] = {
                ...state.conversations[index],
                name: conversationName,
            };
        },

        updateLastViewOfMembers: (state, action) => {
            const { conversationId, userId, lastView } = action.payload;

            if (conversationId != state.currentConversation) return;

            const index = state.lastViewOfMember.findIndex(
                (ele) => ele.user._id == userId
            );
            state.lastViewOfMember[index].lastView = lastView;
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

            // state.messagesPage = action.payload.messages;
            state.messages = action.payload.messages.data;
            state.currentPage = action.payload.messages.page;
            state.totalPages = action.payload.messages.totalPages;
        },
        [fetchNextPageMessage.fulfilled]: (state, action) => {
            state.messages = [
                ...action.payload.messages.data,
                ...state.messages,
            ];
            state.currentPage = action.payload.messages.page;
        },
        // FRIEND
        [fetchListFriends.pending]: (state, action) => {
            state.isLoading = true;
        },
        [fetchListFriends.rejected]: (state, action) => {
            state.isLoading = false;
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

            tempMembers.forEach((member) => {
                state.friends.forEach((friend) => {
                    if (member._id == friend._id) {
                        member = { ...member, isFriend: true };
                        return;
                    }
                });
                temp.push(member);
            });

            state.memberInConversation = temp;
        },

        // classify
        [fetchListClassify.fulfilled]: (state, action) => {
            state.classifies = action.payload;
            state.isLoading = false;
        },
        [fetchListClassify.rejected]: (state, action) => {
            state.classifies = action.payload;
            state.isLoading = false;
        },
        [fetchListClassify.pending]: (state, action) => {
            state.isLoading = true;
        },

        [fetchListColor.fulfilled]: (state, action) => {
            state.colors = action.payload;
        },

        [fetchPinMessages.fulfilled]: (state, action) => {
            state.pinMessages = action.payload.reverse();
        },

        [fetchPinMessages.fulfilled]: (state, action) => {
            state.pinMessages = action.payload.reverse();
        },
        [getLastViewOfMembers.fulfilled]: (state, action) => {
            state.lastViewOfMember = action.payload;
        },
    },
});

const { reducer, actions } = chatSlice;
export const {
    addMessage,
    setFriends,
    removeConversation,
    setTypeOfConversation,
    setRaisePage,
    setRedoMessage,
    deleteMessageClient,
    setToTalUnread,
    setReactionMessage,
    updateConversationWhenAddMember,
    leaveGroup,
    updateMemberLeaveGroup,
    isDeletedFromGroup,
    setCurrentConversation,
    updateClassifyToConver,
    setConversations,
    setNumberUnreadForNewFriend,
    updateTimeForConver,
    updateNameOfConver,
    updateLastViewOfMembers,
} = actions;

export default reducer;
