import axiosClient from './axiosClient';

const API_URL = '/conversations';

const conversationApi = {
    fetchListConversations: (name, type) => {
        return axiosClient.get(API_URL, {
            params: {
                name,
                type,
            },
        });
    },

    // [POST] /individuals/:userId

    createConversationIndividual: (userId) => {
        return axiosClient.post(`${API_URL}/individuals/${userId}`);
    },

    createGroup: (name, userIds) => {
        return axiosClient.post(`${API_URL}/groups`, {
            name,
            userIds,
        });
    },

    getConversationById: (id) => {
        return axiosClient.get(`${API_URL}/${id}`);
    },

    deleteConversation: (id) => {
        return axiosClient.delete(`${API_URL}/${id}`)
    },

    getMemberInConversation: (id) => {
        return axiosClient.get(`${API_URL}/${id}/members`);
    },

    addMembersToConver: (userIds, coversationIds) => {
        return axiosClient.post(`${API_URL}/${coversationIds}/members`, {
            userIds
        });
    },

    leaveGroup: (conversationId) => {
        return axiosClient.delete(`${API_URL}/${conversationId}/members/leave`)
    },

    deleteMember: (conversationId, userId) => {
        return axiosClient.delete(`${API_URL}/${conversationId}/members/${userId}`)
    },

};

export default conversationApi;
