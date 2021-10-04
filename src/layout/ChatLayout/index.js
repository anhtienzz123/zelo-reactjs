import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Chat from 'features/Chat';
import NotFoundPage from 'components/NotFoundPage';
import Friend from 'features/Friend';
import { Col, Row } from 'antd';
import HeaderChatContainer from 'features/Chat/containers/HeaderChatContainer';
import NavbarContainer from 'features/Chat/containers/NavbarContainer';
import {
    fetchListRequestFriend,
    fetchListMyRequestFriend,
    fetchFriends,
    fetchListGroup,

} from 'features/Friend/friendSlice';

import {
    fetchListClassify,
    fetchListColor,
    fetchListConversations,
    updateClassifyToConver,
} from 'features/Chat/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import classifyUtils from 'utils/classifyUtils';


function ChatLayout(props) {
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const { classifies, conversations } = useSelector((state) => state.chat);

    useEffect(() => {
        dispatch(fetchListRequestFriend());
    }, []);

    useEffect(() => {
        dispatch(fetchListMyRequestFriend());
    }, []);


    useEffect(() => {
        dispatch(fetchFriends({
            name: ''
        }));
    }, []);

    useEffect(() => {
        dispatch(fetchListGroup({
            name: '',
            type: 2
        }))
    }, []);

    useEffect(() => {
        dispatch(fetchListClassify());
    }, []);

    useEffect(() => {
        dispatch(fetchListColor());
    }, []);

    useEffect(() => {
        dispatch(fetchListConversations({}));
    }, []);

    // useEffect(() => {
    //     if (classifies.length > 0 && conversations.length > 0) {
    //         const data = classifyUtils.addClassifyToConver(classifies, conversations);
    //         // dispatch(updateClassifyToConver(data));
    //         // console.log("check data", data);

    //     }
    // }, [classifies, conversations])


    return (
        <div>
            <Row gutter={[0, 0]}>
                <Col span={1}>
                    <NavbarContainer />
                </Col>
                <Col span={23}>
                    <Switch>
                        <Route exact path={url} component={Chat} />
                        <Route
                            exact
                            path={`${url}/friends`}
                            component={Friend}
                        />

                        <Route component={NotFoundPage} />
                    </Switch>
                </Col>
            </Row>
        </div>
    );
}

export default ChatLayout;
