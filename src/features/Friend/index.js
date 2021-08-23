import { Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

function Friend(props) {
    const { isLoading } = useSelector((state) => state.friend);
    return <Spin spinning={isLoading}>Friend</Spin>;
}

export default Friend;
