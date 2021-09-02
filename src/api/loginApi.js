import axiosClient from './axiosClient';

const loginApi = {
    login: (username, password) => {
        const url = '/auth/login';

        return axiosClient.post(url, { username, password });
    },
    registry: (username, password,passwordconfirm) => {
        const url = '/auth/registry';

        return axiosClient.post(url, { username, password ,passwordconfirm});
    },
    forgot: (username) => {
        const url = '/auth/forgot';

        return axiosClient.post(url, { username});
    },
    confirmAccount: (username, password) => {
		const url = '/auth/confirm-account';
		return axiosClient.post(url, { username, password });
	},
	confirmPassword: (username, password) => {
		const url = '/auth/confirm-password';
		return axiosClient.post(url, { username, password });
	},

	fetchUser: (username) => {
		const url = `/auth/users/${username}`;
		return axiosClient.get(url);
	},

};

export default loginApi;
