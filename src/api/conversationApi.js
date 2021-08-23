import axiosClient from './axiosClient';

const API_URL = '/conversations';

const conversationApi = {
    fetchListConversations: () => {
        return axiosClient.get(API_URL);
    },
};

export default conversationApi;
