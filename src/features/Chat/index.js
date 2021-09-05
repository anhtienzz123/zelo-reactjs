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
import { SLIDER_IMAGES } from 'constants/images'
import Slider from 'components/Slider'
import { useRouteMatch } from 'react-router';


let socket = io(process.env.REACT_APP_API_URL, { transports: ['websocket'] });

Chat.propTypes = {};

function Chat(props) {

    const dispatch = useDispatch();
    const { conversations, isLoading, currentConversation } = useSelector((state) => state.chat);
    const { path } = useRouteMatch();

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

                {
                    path === '/chat' && currentConversation ? (
                        <>
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
