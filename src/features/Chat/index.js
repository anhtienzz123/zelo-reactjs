import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

Chat.propTypes = {};

function Chat(props) {
    const { isLoading } = useSelector((state) => state.chat);

    return <Spin spinning={isLoading}>chat</Spin>;
}

export default Chat;
