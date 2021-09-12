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

    sendFileThroughMessage: (file, attachInfo) => {
        const { type, conversationId } = attachInfo;
        return axiosClient.post(`${API_URL}/files`, file, {
            params: {
                type,
                conversationId,
            }
        })
    }
};

export default messageApi;
