import axiosClient from './axiosClient';

const API_URL = '/me';

const meApi = {
    fetchProfile: () => {
        return axiosClient.get(`${API_URL}/profile`);
    },
};

export default meApi;
