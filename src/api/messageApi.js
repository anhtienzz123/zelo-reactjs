import axiosClient from './axiosClient';

const API_URL = '/messages';

const messageApi = {
    fetchListMessages: (conversationId, page, size) => {
        return axiosClient.get(`${API_URL}/${conversationId}`, {
            params: {
                page,
                size,
            },
        });
    },

    sendTextMessage: (message) => {
        return axiosClient.post(`${API_URL}/text`, message);
    },
};

export default messageApi;
