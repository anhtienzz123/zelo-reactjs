import { DoubleLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Col, message, Row } from 'antd';
import { setJoinChatLayout } from 'app/globalSlice';
import Slider from 'components/Slider';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import DrawerPinMessage from './components/DrawerPinMessage';
import GroupNews from './components/GroupNews';
import NutshellPinMessage from './components/NutshellPinMessage/NutshellPinMessage';
import BodyChatContainer from './containers/BodyChatContainer';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import InfoContainer from './containers/InfoContainer';
import SearchContainer from './containers/SearchContainer';
import {
    addMessage,
    fetchConversationById,
    fetchListFriends,
    fetchPinMessages,
    isDeletedFromGroup,
    removeConversation,
    setCurrentConversation,
    setReactionMessage,
    setRedoMessage,
    updateLastViewOfMembers,
    updateNameOfConver,
    updateTimeForConver,
} from './slice/chatSlice';
import './style.scss';

Chat.propTypes = {
    socket: PropTypes.object,
    idNewMessage: PropTypes.string,
};

Chat.defaultProps = {
    socket: {},
    idNewMessage: '',
};

function Chat({ socket, idNewMessage }) {
    const dispatch = useDispatch();
    const { conversations, currentConversation, pinMessages } = useSelector(
        (state) => state.chat
    );
    const { path } = useRouteMatch();
    const [scrollId, setScrollId] = useState('');
    // const [idNewMessage, setIdNewMessage] = useState('')
    const [isShow, setIsShow] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [hasMessage, setHasMessage] = useState('');
    const [usersTyping, setUsersTyping] = useState([]);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const { isJoinChatLayout, isJoinFriendLayout, user } = useSelector(
        (state) => state.global
    );
    const [visibleNews, setVisibleNews] = useState(false);

    useEffect(() => {
        console.log('User typing', usersTyping);
    }, [usersTyping]);

    useEffect(() => {
        dispatch(
            fetchListFriends({
                name: '',
            })
        );
    }, []);

    const refCurrentConversation = useRef();
    const refConversations = useRef();

    useEffect(() => {
        refCurrentConversation.current = currentConversation;
    }, [currentConversation]);

    useEffect(() => {
        refConversations.current = conversations;
    }, [conversations]);

    useEffect(() => {
        if (currentConversation) {
            dispatch(fetchPinMessages({ conversationId: currentConversation }));
        }
    }, [currentConversation]);

    useEffect(() => {
        if (!isJoinChatLayout) {
            socket.on('delete-conversation', (conversationId) => {
                dispatch(removeConversation(conversationId));
            });

            socket.on('delete-message', (conversationId, id) => {
                handleDeleteMessage(conversationId, id, refCurrentConversation);
            });

            socket.on('added-group', (conversationId) => {
                dispatch(fetchConversationById({ conversationId }));
            });

            socket.on(
                'add-reaction',
                (conversationId, messageId, user, type) => {
                    if (conversationId === refCurrentConversation.current) {
                        dispatch(setReactionMessage({ messageId, user, type }));
                    }
                }
            );

            socket.on('typing', (conversationId, user) => {
                console.log(
                    'efCurrentConversation.current',
                    refCurrentConversation.current
                );
                if (conversationId === refCurrentConversation.current) {
                    console.log(
                        'typing......',
                        conversationId,
                        refCurrentConversation
                    );
                    const index = usersTyping.findIndex(
                        (ele) => ele._id === user._id
                    ); //khoo

                    if (usersTyping.length === 0 || index < 0) {
                        setUsersTyping([...usersTyping, user]);
                    }
                }
            });

            socket.on('not-typing', (conversationId, user) => {
                if (conversationId === refCurrentConversation.current) {
                    const index = usersTyping.findIndex(
                        (ele) => ele._id === user._id
                    );
                    const newUserTyping = usersTyping.filter(
                        (ele) => ele._id !== user._id
                    );
                    console.log('newUserTyping', newUserTyping);
                    setUsersTyping(newUserTyping);
                }
            });

            socket.on('deleted-group', (conversationId) => {
                const conversation = refConversations.current.find(
                    (ele) => ele._id === conversationId
                );
                message.warning(`Bạn đã bị xóa khỏi nhóm ${conversation.name}`);
                if (conversationId === refCurrentConversation.current) {
                    dispatch(setCurrentConversation(''));
                }
                dispatch(isDeletedFromGroup(conversationId));
                socket.emit('leave-conversation', conversationId);
            });

            socket.on('action-pin-message', (conversationId) => {
                if (conversationId === refCurrentConversation.current) {
                    dispatch(fetchPinMessages({ conversationId }));
                }
            });

            socket.on(
                'rename-conversation',
                (conversationId, conversationName, message) => {
                    dispatch(
                        updateNameOfConver({ conversationId, conversationName })
                    );
                    dispatch(addMessage(message));
                }
            );

            socket.on(
                'user-last-view',
                ({ conversationId, userId, lastView }) => {
                    if (userId != user._id) {
                        dispatch(
                            updateLastViewOfMembers({
                                conversationId,
                                userId,
                                lastView,
                            })
                        );
                    }
                }
            );
        }
        dispatch(setJoinChatLayout(true));
    }, []);

    const emitUserOnline = (currentConver) => {
        if (currentConver) {
            const conver = conversations.find(
                (ele) => ele._id === currentConver
            );
            if (!conver.type) {
                const userId = conver.userId;
                socket.emit(
                    'get-user-online',
                    userId,
                    ({ isOnline, lastLogin }) => {
                        console.log(userId, isOnline, lastLogin);
                        dispatch(
                            updateTimeForConver({
                                id: currentConver,
                                isOnline,
                                lastLogin,
                            })
                        );
                    }
                );
            }
        }
    };

    useEffect(() => {
        emitUserOnline(currentConversation);
    }, [currentConversation]);

    useEffect(() => {
        const intervalCall = setInterval(() => {
            emitUserOnline(currentConversation);
        }, 180000);

        return () => {
            clearInterval(intervalCall);
        };
    }, [currentConversation]);

    const handleDeleteMessage = (
        conversationId,
        id,
        refCurrentConversation
    ) => {
        if (refCurrentConversation.current === conversationId) {
            dispatch(setRedoMessage(id));
        }
    };

    const handleScrollWhenSent = (value) => {
        setScrollId(value);
    };

    const hanldeOnClickScroll = () => {
        setIsScroll(true);
    };

    const handleBackToBottom = (value, message) => {
        if (message) {
            setHasMessage(message);
        } else {
            setHasMessage('');
        }
        setIsShow(value);
    };

    const hanldeResetScrollButton = (value) => {
        setIsScroll(value);
    };

    const handleOnBack = () => {
        setVisibleNews(false);
    };
    const handleViewNews = () => {
        setVisibleNews(true);
    };

    // Xử lý modal mode

    return (
        <div id="main-chat-wrapper">
            <Row gutter={[0, 0]}>
                <Col span={5}>
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

                {path === '/chat' && currentConversation ? (
                    <>
                        <Col span={13}>
                            <div className="main_chat">
                                <div className="main_chat-header">
                                    <HeaderChatContainer />
                                </div>

                                <div className="main_chat-body">
                                    <div id="main_chat-body--view">
                                        <BodyChatContainer
                                            scrollId={scrollId}
                                            onSCrollDown={idNewMessage}
                                            onBackToBottom={handleBackToBottom}
                                            onResetScrollButton={
                                                hanldeResetScrollButton
                                            }
                                            turnOnScrollButoon={isScroll}
                                        />

                                        {pinMessages.length > 1 && (
                                            <div className="pin-message">
                                                <DrawerPinMessage
                                                    isOpen={isOpenDrawer}
                                                    onOpen={() =>
                                                        setIsOpenDrawer(true)
                                                    }
                                                    onClose={() =>
                                                        setIsOpenDrawer(false)
                                                    }
                                                    message={pinMessages}
                                                    onViewNews={handleViewNews}
                                                />
                                            </div>
                                        )}

                                        {pinMessages.length > 0 && (
                                            <div className="nutshell-pin-message">
                                                <NutshellPinMessage
                                                    isHover={false}
                                                    isItem={
                                                        pinMessages.length > 1
                                                            ? false
                                                            : true
                                                    }
                                                    message={pinMessages[0]}
                                                    quantity={
                                                        pinMessages.length
                                                    }
                                                    onOpenDrawer={() =>
                                                        setIsOpenDrawer(true)
                                                    }
                                                    onViewNews={handleViewNews}
                                                />
                                            </div>
                                        )}

                                        {/* {FriendUtils.checkIsFriend()} */}

                                        <div
                                            id="back-top-button"
                                            className={`${
                                                isShow ? 'show' : 'hide'
                                            } ${
                                                hasMessage ? 'new-message' : ''
                                            }`}
                                            onClick={hanldeOnClickScroll}
                                        >
                                            {hasMessage ? (
                                                <div className="db-arrow-new-message">
                                                    <span className="arrow">
                                                        <DoubleLeftOutlined />
                                                    </span>
                                                    <span>
                                                        &nbsp;{hasMessage}
                                                    </span>
                                                </div>
                                            ) : (
                                                <DownOutlined />
                                            )}
                                        </div>

                                        {usersTyping.length > 0 && (
                                            <div className="typing-message">
                                                {usersTyping.map(
                                                    (ele, index) => (
                                                        <span>
                                                            {index < 3 && (
                                                                <>
                                                                    {index ===
                                                                    usersTyping.length -
                                                                        1
                                                                        ? `${ele.name} `
                                                                        : `${ele.name}, `}
                                                                </>
                                                            )}
                                                        </span>
                                                    )
                                                )}

                                                {usersTyping.length > 3
                                                    ? `và ${
                                                          usersTyping.length - 3
                                                      } người khác`
                                                    : ''}

                                                <span>&nbsp;đang nhập</span>

                                                <div className="dynamic-dot">
                                                    <div className="dot"></div>
                                                    <div className="dot"></div>
                                                    <div className="dot"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="main_chat-body--input">
                                        <FooterChatContainer
                                            onScrollWhenSentText={
                                                handleScrollWhenSent
                                            }
                                            socket={socket}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="main-info">
                                {visibleNews ? (
                                    <GroupNews onBack={handleOnBack} />
                                ) : (
                                    <InfoContainer socket={socket} />
                                )}
                            </div>
                        </Col>
                    </>
                ) : (
                    <Col span={19}>
                        <div className="landing-app">
                            <div className="title-welcome">
                                <div className="title-welcome-heading">
                                    <span>
                                        Chào mừng đến với <b>Zelo</b>
                                    </span>
                                </div>

                                <div className="title-welcome-detail">
                                    <span>
                                        Khám phá những tiện ích hỗ trợ làm việc
                                        và trò chuyện cùng người thân, bạn bè
                                        được tối ưu hoá cho máy tính của bạn.
                                    </span>
                                </div>
                            </div>

                            <div className="carousel-slider">
                                <Slider />
                            </div>
                        </div>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default Chat;
