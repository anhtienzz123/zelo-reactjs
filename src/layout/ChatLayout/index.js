import { Col, Row } from 'antd';
import NotFoundPage from 'components/NotFoundPage';
import Chat from 'features/Chat';
import {
    fetchListClassify,
    fetchListColor,
    fetchListConversations
} from 'features/Chat/chatSlice';
import NavbarContainer from 'features/Chat/containers/NavbarContainer';
import Friend from 'features/Friend';
import {
    fetchFriends,
    fetchListGroup,
    fetchListMyRequestFriend,
    fetchListRequestFriend
} from 'features/Friend/friendSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { init, socket } from 'utils/socketClient';




init();
function ChatLayout(props) {
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const { classifies, conversations } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.global);

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


    useEffect(() => {
        const userId = user._id;
        if (userId) socket.emit('join', userId);
    }, [user]);


    useEffect(() => {
        if (conversations.length === 0) return;

        const conversationIds = conversations.map(
            (conversationEle) => conversationEle._id
        );

        socket.emit('join-conversations', conversationIds);
    }, [conversations]);




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
