import { configureStore } from '@reduxjs/toolkit';
import global from './globalSlice';
import account from 'features/Account/accountSlice';
import chat from 'features/Chat/chatSlice';
import friend from 'features/Friend/friendSlice';
import admin from 'features/Admin/adminSlice';
import media from 'features/Chat/mediaSlice';
import callVideo from 'features/CallVideo/callVideoSlice';

const rootReducer = {
    global,
    account,
    chat,
    friend,
    admin,
    media,
    callVideo,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
