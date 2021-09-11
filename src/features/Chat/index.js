import { DownOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Slider from 'components/Slider';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import io from 'socket.io-client';
import { addMessage, fetchConversationById, removeConversation, fetchListFriends } from './chatSlice';
import BodyChatContainer from './containers/BodyChatContainer';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import InfoContainer from './containers/InfoContainer';
import SearchContainer from './containers/SearchContainer';
import './style.scss';


let socket = io(process.env.REACT_APP_API_URL, { transports: ['websocket'] });

Chat.propTypes = {};

function Chat(props) {

    const dispatch = useDispatch();
    const { conversations, isLoading, currentConversation } = useSelector((state) => state.chat);
    const { path } = useRouteMatch();
    const { user } = useSelector((state) => state.global);
    const [scrollId, setScrollId] = useState('');
    const [idNewMessage, setIdNewMessage] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isScroll, setIsScroll] = useState(false);


    useEffect(() => {
        dispatch(fetchListFriends({
            name: ''
        }));
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
        socket.on('new-message', (conversationId, newMessage) => {

            dispatch(addMessage(newMessage));
            setIdNewMessage(newMessage._id);

        });

        socket.on('create-conversation', (conversationId) => {
            dispatch(fetchConversationById({ conversationId }));
        });
        socket.on('delete-conversation', (conversationId) => {

            dispatch(removeConversation(conversationId));
        })
    }, []);

    const handleScrollWhenSent = (value) => {
        setScrollId(value);
    }

    const hanldeOnClickScroll = () => {
        setIsScroll(true);
    }

    const handleBackToBottom = (value) => {
        setIsShow(value);
    }

    const hanldeResetScrollButton = (value) => {
        setIsScroll(value);
    }

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

                {
                    path === '/chat' && currentConversation ? (
                        <>
                            <Col span={13}>
                                <div className='main_chat'>
                                    <div className='main_chat-header'>
                                        <HeaderChatContainer />
                                    </div>

                                    <div className='main_chat-body'>
                                        <div id='main_chat-body--view'>
                                            <BodyChatContainer
                                                scrollId={scrollId}
                                                onSCrollDown={idNewMessage}
                                                onBackToBottom={handleBackToBottom}
                                                onResetScrollButton={hanldeResetScrollButton}
                                                turnOnScrollButoon={isScroll}

                                            />


                                            <div
                                                id="back-top-button"
                                                className={`${isShow ? 'show' : 'hide'}`}
                                                onClick={hanldeOnClickScroll}
                                            >
                                                <DownOutlined />
                                            </div>


                                        </div>

                                        <div className='main_chat-body--input'>
                                            <FooterChatContainer
                                                onScrollWhenSentText={handleScrollWhenSent}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className='main-info'>
                                    <InfoContainer />
                                </div>
                            </Col>
                        </>
                    ) : (
                        <Col span={19}>

                            <div className="landing-app">
                                <div className="title-welcome">
                                    <div className="title-welcome-heading">
                                        <span>Chào mừng đến với <b>Zelo</b></span>
                                    </div>

                                    <div className="title-welcome-detail">
                                        <span>
                                            Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hoá cho máy tính của bạn.
                                        </span>
                                    </div>
                                </div>


                                <div className="carousel-slider">
                                    <Slider />
                                </div>
                            </div>


                        </Col>
                    )

                }

            </Row>
        </div >
    );
}

export default Chat;
