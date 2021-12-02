import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import zeloInfoAPi from 'api/zeloInfoApi';

const KEY = 'HOME';

export const fetchDeveloper = createAsyncThunk(
    `${KEY}/fetchDeveloper`,
    async () => {
        const data = await zeloInfoAPi.getDeveloper();
        return data;
    }
);

export const fetchInfoApp = createAsyncThunk(
    `${KEY}/fetchInfoApp`,
    async () => {
        const data = await zeloInfoAPi.getInfoApp();
        return data;
    }
);

export const fetchFeatures = createAsyncThunk(
    `${KEY}/fetchFeatures`,
    async () => {
        const data = await zeloInfoAPi.getFeature();
        return data;
    }
);

export const fetchInfoWebApp = createAsyncThunk(
    `${KEY}/fetchInfoWebApp`,
    async () => {
        const data = await zeloInfoAPi.getInfoWebApp();
        return data;
    }
);

const homeSlice = createSlice({
    name: KEY,
    initialState: {
        developers: [],
        infoApp: [],
        isLoading: false,
        features: [],
        infoWebApps: [],
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },

    extraReducers: {
        [fetchDeveloper.fulfilled]: (state, action) => {
            state.developers = action.payload;
            state.isLoading = false;
        },

        [fetchDeveloper.pending]: (state, action) => {
            state.isLoading = true;
        },

        [fetchDeveloper.rejected]: (state, action) => {
            state.isLoading = false;
        },

        [fetchInfoApp.fulfilled]: (state, action) => {
            state.infoApp = action.payload;
            state.isLoading = false;
        },

        [fetchInfoApp.pending]: (state, action) => {
            state.isLoading = true;
        },

        [fetchInfoApp.rejected]: (state, action) => {
            state.isLoading = false;
        },

        //

        [fetchFeatures.fulfilled]: (state, action) => {
            state.features = action.payload;
            state.isLoading = false;
        },

        [fetchFeatures.pending]: (state, action) => {
            state.isLoading = true;
        },

        [fetchFeatures.rejected]: (state, action) => {
            state.isLoading = false;
        },

        // fetchInfoWebApp

        [fetchInfoWebApp.fulfilled]: (state, action) => {
            state.infoWebApps = action.payload;
            state.isLoading = false;
        },

        [fetchInfoWebApp.pending]: (state, action) => {
            state.isLoading = true;
        },

        [fetchInfoWebApp.rejected]: (state, action) => {
            state.isLoading = false;
        },
    },
});

const { reducer, actions } = homeSlice;
export const { setLoading } = actions;

export default reducer;
