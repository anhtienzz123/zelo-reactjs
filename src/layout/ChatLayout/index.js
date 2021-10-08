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
import useWindowUnloadEffect from 'hooks/useWindowUnloadEffect';
init();


function ChatLayout(props) {
    const { url } = useRouteMatch();
    const dispatch = useDispatch();
    const { conversations } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.global);



    useEffect(() => {
        return () => {
            socket.close();
        }
    }, [])

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

    useEffect(() => {
        // window.addEventListener("unload", leaveApp);
        // return () => {
        //     window.addEventListener("unload", leaveApp);
        // }

        // window.addEventListener('beforeunload', function (e) {
        //     // Cancel the event
        //     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        //     // Chrome requires returnValue to be set
        //     localStorage.setItem('phuc', user._id);
        //     socket.emit('leave', user._id);
        // });

    }, []);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    useWindowUnloadEffect(async () => {

        async function leaveApp() {

            socket.emit('leave', user._id);
            await sleep(2000);
        }

        await leaveApp();




    }, true);









    return (
        <div>
            {/* <button onClick={leaveApp} >test scoket</button> */}
            <Row gutter={[0, 0]}>
                <Col span={1}>
                    <NavbarContainer />
                </Col>
                <Col span={23}>
                    <Switch>
                        <Route
                            exact
                            path={url}
                            render={(props) => (
                                <Chat
                                    {...props}
                                    socket={socket}
                                    authed={true}
                                />
                            )}
                        />

                        <Route
                            exact
                            path={`${url}/friends`}
                            render={(props) => (
                                <Friend
                                    {...props}
                                    socket={socket}
                                    authed={true}
                                />
                            )}
                        />

                        <Route component={NotFoundPage} />
                    </Switch>
                </Col>
            </Row>
        </div>
    );
}

export default ChatLayout;
