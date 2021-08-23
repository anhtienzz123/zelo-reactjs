import axiosClient from './axiosClient';

const loginApi = {
    login: (username, password) => {
        const url = '/auth/login';

        return axiosClient.post(url, { username, password });
    },
};

export default loginApi;
