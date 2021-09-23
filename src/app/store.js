import { configureStore } from '@reduxjs/toolkit';
import global from './globalSlice';
import account from 'features/Account/accountSlice';
import chat from 'features/Chat/chatSlice';
import friend from 'features/Friend/friendSlice';
import callVideo from 'features/CallVideo/callVideoSlice';

const rootReducer = {
    global,
    account,
    chat,
    friend,
    callVideo,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
