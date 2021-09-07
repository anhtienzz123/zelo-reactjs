import axiosClient from './axiosClient';

const API_URL = '/friends';

const friendApi = {
    fetchFriends: (name) => {
        return axiosClient.get(`${API_URL}`, {
            params: {
                name
            }
        });
    }
}

export default friendApi;