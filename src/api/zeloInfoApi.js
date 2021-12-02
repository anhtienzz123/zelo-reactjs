const BASE_MOCK_API = 'https://61a85438387ab200171d30b7.mockapi.io';

const zeloInfoAPi = {
    getDeveloper: async () => {
        const response = await fetch(`${BASE_MOCK_API}/developer`);
        const data = await response.json();
        return data;
    },
    getInfoApp: async () => {
        const response = await fetch(`${BASE_MOCK_API}/infoapp`);
        const data = await response.json();
        return data;
    },
    getFeature: async () => {
        const response = await fetch(`${BASE_MOCK_API}/features`);
        const data = await response.json();
        return data;
    },
    getInfoWebApp: async () => {
        const response = await fetch(`${BASE_MOCK_API}/infowebapp`);
        const data = await response.json();
        return data;
    },
};

export default zeloInfoAPi;
