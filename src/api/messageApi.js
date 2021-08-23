import axiosClient from './axiosClient';

const API_URL = '/messages';

const messageApi = {
    fetchListMessages: (conversationId) => {
        return axiosClient.get(`${API_URL}/${conversationId}`);
    },
};

export default messageApi;
