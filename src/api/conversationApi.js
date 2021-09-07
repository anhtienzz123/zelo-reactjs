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

    createGroup: (name, userIds) => {
        return axiosClient.post(`${API_URL}/groups`, {
            name,
            userIds,
        }
        )
    },

    getConversationById: (id) => {
        return axiosClient.get(`${API_URL}/${id}`);
    }
};

export default conversationApi;
