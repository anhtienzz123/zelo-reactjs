import { Col, Row, Spin } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import BodyChatContainer from './containers/BodyChatContainer';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import InfoContainer from './containers/InfoContainer';
import SearchContainer from './containers/SearchContainer';
import './style.scss';

Chat.propTypes = { };

function Chat(props) {
    const { isLoading } = useSelector((state) => state.chat);

    return (
        <div id='main-chat-wrapper'>
            <Row gutter={[0, 0]}>
                <Col span={5} >
                    <div className="main-conversation">
                        <div className="main-conversation_search-bar">
                            <SearchContainer />
                        </div>

                        <div className="divider-layout">
                            <div></div>
                        </div>

                        <div className="main-conversation_list-conversation">
                            <ConversationContainer />
                        </div>
                    </div>
                </Col>
                <Col span={13} >
                    <div className="main_chat">

                        <div className="main_chat-header">
                            <HeaderChatContainer />
                        </div>

                        <div className="main_chat-body">
                            <div className="main_chat-body--view">
                                <BodyChatContainer />
                            </div>

                            <div className="main_chat-body--input">
                                <FooterChatContainer />
                            </div>
                        </div>

                    </div>
                </Col>
                <Col span={6} >
                    <div className="main-info">
                        <InfoContainer />
                    </div>
                </Col>

            </Row>
        </div>

    )
}

export default Chat;
