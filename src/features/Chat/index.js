import { Col, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BodyChatContainer from './containers/BodyChatContainer';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import InfoContainer from './containers/InfoContainer';
import SearchContainer from './containers/SearchContainer';
import './style.scss';
import io from 'socket.io-client';
import { addMessage } from './chatSlice';

let socket = io(process.env.REACT_APP_API_URL, { transports: ['websocket'] });

Chat.propTypes = {};

function Chat(props) {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.chat);
    const { conversations } = useSelector((state) => state.chat);

    useEffect(() => {
        if (conversations.length === 0) return;

        const conversationIds = conversations.map(
            (conversationEle) => conversationEle._id
        );

        socket.emit('join-conversations', conversationIds);
    }, [conversations]);

    useEffect(() => {
        socket.on('new-message', (newMessage) => {
            dispatch(addMessage(newMessage));
        });
    }, []);

    return (
        <div id='main-chat-wrapper'>
            <Row gutter={[0, 0]}>
                <Col span={5}>
                    <div className='main-conversation'>
                        <div className='main-conversation_search-bar'>
                            <SearchContainer />
                        </div>

                        <div className='divider-layout'>
                            <div></div>
                        </div>

                        <div className='main-conversation_list-conversation'>
                            <ConversationContainer />
                        </div>
                    </div>
                </Col>
                <Col span={13}>
                    <div className='main_chat'>
                        <div className='main_chat-header'>
                            <HeaderChatContainer />
                        </div>

                        <div className='main_chat-body'>
                            <div className='main_chat-body--view'>
                                <BodyChatContainer />
                            </div>

                            <div className='main_chat-body--input'>
                                <FooterChatContainer />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={6}>
                    <div className='main-info'>
                        <InfoContainer />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Chat;
