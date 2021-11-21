import { DoubleLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Col, message as messageNotify, notification, Row, Spin } from 'antd';
import conversationApi from 'api/conversationApi';
import { setJoinChatLayout } from 'app/globalSlice';
import ModalJoinGroupFromLink from 'components/ModalJoinGroupFromLink';
import Slider from 'components/Slider';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
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
    fetchListMessages,
    fetchPinMessages,
    getLastViewOfMembers,
    getMembersConversation,
    isDeletedFromGroup,
    removeChannel,
    removeConversation,
    setCurrentChannel,
    setCurrentConversation,
    setReactionMessage,
    setRedoMessage,
    setTotalChannelNotify,
    setTypeOfConversation,
    updateChannel,
    updateLastViewOfMembers,
    updateNameChannel,
    updateNameOfConver,
    updateTimeForConver,
    updateAvavarConver,
    updateVoteMessage,
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
    const {
        conversations,
        currentConversation,
        pinMessages,
        isLoading,
        currentChannel,
        channels,
    } = useSelector((state) => state.chat);
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
    const [tabActiveInNews, setTabActiveNews] = useState(0);
    const location = useLocation();
    const history = useHistory();
    const [isVisibleModalJoinGroup, setIsVisibleJoinGroup] = useState(false);
    const [summaryGroup, setSummary] = useState({});
    const refCurrentConversation = useRef();
    const refConversations = useRef();
    const refCurrentChannel = useRef();
    const [replyMessage, setReplyMessage] = useState({});
    const [userMention, setUserMention] = useState({});
    const [conversationFil, setConversationFil] = useState([conversations]);

    useEffect(() => {
        if (conversations.length > 0) {
            setConversationFil(conversations);
        }
    }, []);

    useEffect(() => {
        refCurrentConversation.current = currentConversation;
    }, [currentConversation]);

    useEffect(() => {
        refConversations.current = conversations;
    }, [conversations]);

    useEffect(() => {
        refCurrentChannel.current = currentChannel;
    }, [currentChannel]);

    useEffect(() => {
        setUsersTyping([]);
        setReplyMessage(null);
        setUserMention({});
    }, [currentConversation]);

    useEffect(() => {
        if (currentConversation) {
            dispatch(setTotalChannelNotify());
        }
    }, [currentConversation, channels, conversations]);

    useEffect(() => {
        const openModalJoinFromLink = async () => {
            if (location.state && location.state.conversationId) {
                const data = await conversationApi.fetchListConversations();
                const tempId = location.state.conversationId;

                if (data.findIndex((ele) => ele._id === tempId) < 0) {
                    try {
                        const data = await conversationApi.getSummaryInfoGroup(
                            tempId
                        );
                        setSummary(data);
                        setIsVisibleJoinGroup(true);
                    } catch (error) {
                        messageNotify.warning(
                            'Trưởng nhóm đã tắt tính năng tham gia nhóm bằng liên kết'
                        );
                    }
                } else {
                    dispatch(
                        fetchListMessages({ conversationId: tempId, size: 10 })
                    );
                    dispatch(
                        getMembersConversation({ conversationId: tempId })
                    );
                    dispatch(setTypeOfConversation(tempId));
                    dispatch(getLastViewOfMembers({ conversationId: tempId }));
                }

                history.replace({
                    state: {
                        conversationId: null,
                    },
                });
            }
        };
        openModalJoinFromLink();
    }, []);

    // useEffect(() => {
    //     console.log('User typing', usersTyping);
    // }, [usersTyping]);

    useEffect(() => {
        dispatch(
            fetchListFriends({
                name: '',
            })
        );
    }, []);

    useEffect(() => {
        if (
            currentConversation &&
            conversations.find((ele) => ele._id === currentConversation).type
        ) {
            dispatch(fetchPinMessages({ conversationId: currentConversation }));
        }
    }, [currentConversation]);

    useEffect(() => {
        if (!isJoinChatLayout) {
            socket.on('delete-conversation', (conversationId) => {
                const conver = refConversations.current.find(
                    (ele) => ele._id === conversationId
                );
                if (conver.leaderId !== user._id) {
                    notification.info({
                        placement: 'topRight',
                        bottom: 50,
                        duration: 3,
                        rtl: true,
                        message: (
                            <span>
                                Nhóm <strong>{conver.name}</strong> đã giải tán
                            </span>
                        ),
                    });
                }

                dispatch(removeConversation(conversationId));
            });

            socket.on('delete-message', ({ conversationId, channelId, id }) => {
                handleDeleteMessage(conversationId, channelId, id);
            });

            socket.on('added-group', (conversationId) => {
                dispatch(fetchConversationById({ conversationId }));
            });

            socket.on(
                'add-reaction',
                ({ conversationId, channelId, messageId, user, type }) => {
                    if (
                        refCurrentConversation.current === conversationId &&
                        refCurrentChannel.current === channelId
                    ) {
                        dispatch(setReactionMessage({ messageId, user, type }));
                    }
                    if (
                        !channelId &&
                        refCurrentConversation.current === conversationId
                    ) {
                        dispatch(setReactionMessage({ messageId, user, type }));
                    }
                }
            );

            socket.on('typing', (conversationId, user) => {
                if (conversationId === refCurrentConversation.current) {
                    const index = usersTyping.findIndex(
                        (ele) => ele._id === user._id
                    );

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

                    setUsersTyping(newUserTyping);
                }
            });

            socket.on('deleted-group', (conversationId) => {
                const conversation = refConversations.current.find(
                    (ele) => ele._id === conversationId
                );

                notification.info({
                    placement: 'topRight',
                    bottom: 50,
                    duration: 3,
                    rtl: true,
                    message: (
                        <span>
                            Bạn đã bị xóa khỏi nhóm{' '}
                            <strong>{conversation.name}</strong>
                        </span>
                    ),
                });
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
                ({ conversationId, userId, lastView, channelId }) => {
                    if (userId != user._id) {
                        dispatch(
                            updateLastViewOfMembers({
                                conversationId,
                                userId,
                                lastView,
                                channelId,
                            })
                        );
                    }
                }
            );

            socket.on('update-member', async (conversationId) => {
                if (conversationId === refCurrentConversation.current) {
                    await dispatch(getLastViewOfMembers({ conversationId }));
                }
            });

            socket.on(
                'new-channel',
                ({ _id, name, conversationId, createdAt }) => {
                    if (conversationId === refCurrentConversation.current) {
                        dispatch(updateChannel({ _id, name, createdAt }));
                    }
                }
            );

            socket.on(
                'delete-channel',
                async ({ conversationId, channelId }) => {
                    const actionAfterDelete = async () => {
                        await dispatch(setCurrentChannel(''));
                        dispatch(
                            fetchListMessages({
                                conversationId: refCurrentConversation.current,
                                size: 10,
                            })
                        );
                        dispatch(
                            getLastViewOfMembers({
                                conversationId: refCurrentConversation.current,
                            })
                        );
                    };
                    await actionAfterDelete();

                    if (refCurrentConversation.current === conversationId) {
                        dispatch(removeChannel({ channelId }));
                    }
                }
            );

            socket.on('update-channel', ({ _id, name, conversationId }) => {
                if (refCurrentConversation.current === conversationId) {
                    dispatch(updateNameChannel({ channelId: _id, name }));
                }
            });

            socket.on(
                'update-avatar-conversation',
                (conversationId, conversationAvatar, message) => {
                    if (refCurrentConversation.current === conversationId) {
                        dispatch(
                            updateAvavarConver({
                                conversationId,
                                conversationAvatar,
                            })
                        );
                    }
                }
            );

            socket.on('update-vote-message', (conversationId, voteMessage) => {
                if (refCurrentConversation.current === conversationId) {
                    console.log('voteMessage', voteMessage);
                    dispatch(
                        updateVoteMessage({
                            voteMessage,
                        })
                    );
                }
            });
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

    const handleDeleteMessage = (conversationId, channelId, id) => {
        if (
            refCurrentConversation.current === conversationId &&
            refCurrentChannel.current === channelId
        ) {
            dispatch(setRedoMessage({ id }));
        }
        if (!channelId && refCurrentConversation.current === conversationId) {
            dispatch(setRedoMessage({ id, conversationId }));
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
        setTabActiveNews(0);
    };

    const handleCancelModalJoinGroup = () => {
        setIsVisibleJoinGroup(false);
    };

    const handleChangeViewChannel = () => {
        setVisibleNews(true);
        setTabActiveNews(2);
    };

    const handleChangeActiveKey = (key) => {
        setTabActiveNews(key);
    };

    const handleOnReply = (mes) => {
        setReplyMessage(mes);
    };

    const handleCloseReply = () => {
        setReplyMessage({});
    };

    const handleOnMention = (userMent) => {
        if (user._id !== userMent._id) {
            setUserMention(userMent);
        }
    };

    const handleOnRemoveMention = () => {
        setUserMention({});
    };

    // Xử lý modal mode

    return (
        <Spin spinning={isLoading}>
            {Object.keys(summaryGroup).length > 0 && (
                <ModalJoinGroupFromLink
                    isVisible={isVisibleModalJoinGroup}
                    info={summaryGroup}
                    onCancel={handleCancelModalJoinGroup}
                />
            )}

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
                                                onBackToBottom={
                                                    handleBackToBottom
                                                }
                                                onResetScrollButton={
                                                    hanldeResetScrollButton
                                                }
                                                turnOnScrollButoon={isScroll}
                                                onReply={handleOnReply}
                                                onMention={handleOnMention}
                                            />

                                            {pinMessages.length > 1 &&
                                                conversations.find(
                                                    (ele) =>
                                                        ele._id ===
                                                        currentConversation
                                                ).type &&
                                                !currentChannel && (
                                                    <div className="pin-message">
                                                        <DrawerPinMessage
                                                            isOpen={
                                                                isOpenDrawer
                                                            }
                                                            onOpen={() =>
                                                                setIsOpenDrawer(
                                                                    true
                                                                )
                                                            }
                                                            onClose={() =>
                                                                setIsOpenDrawer(
                                                                    false
                                                                )
                                                            }
                                                            message={
                                                                pinMessages
                                                            }
                                                            onViewNews={
                                                                handleViewNews
                                                            }
                                                        />
                                                    </div>
                                                )}

                                            {pinMessages.length > 0 &&
                                                conversations.find(
                                                    (ele) =>
                                                        ele._id ===
                                                        currentConversation
                                                ).type &&
                                                !currentChannel && (
                                                    <div className="nutshell-pin-message">
                                                        <NutshellPinMessage
                                                            isHover={false}
                                                            isItem={
                                                                pinMessages.length >
                                                                1
                                                                    ? false
                                                                    : true
                                                            }
                                                            message={
                                                                pinMessages[0]
                                                            }
                                                            quantity={
                                                                pinMessages.length
                                                            }
                                                            onOpenDrawer={() =>
                                                                setIsOpenDrawer(
                                                                    true
                                                                )
                                                            }
                                                            onViewNews={
                                                                handleViewNews
                                                            }
                                                        />
                                                    </div>
                                                )}

                                            {/* {FriendUtils.checkIsFriend()} */}

                                            <div
                                                id="back-top-button"
                                                className={`${
                                                    isShow ? 'show' : 'hide'
                                                } ${
                                                    hasMessage
                                                        ? 'new-message'
                                                        : ''
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

                                            {usersTyping.length > 0 &&
                                                !refCurrentChannel.current && (
                                                    <div className="typing-message">
                                                        {usersTyping.map(
                                                            (ele, index) => (
                                                                <span>
                                                                    {index <
                                                                        3 && (
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
                                                                  usersTyping.length -
                                                                  3
                                                              } người khác`
                                                            : ''}

                                                        <span>
                                                            &nbsp;đang nhập
                                                        </span>

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
                                                replyMessage={replyMessage}
                                                onCloseReply={handleCloseReply}
                                                userMention={userMention}
                                                onRemoveMention={
                                                    handleOnRemoveMention
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="main-info">
                                    {visibleNews ? (
                                        <GroupNews
                                            tabActive={tabActiveInNews}
                                            onBack={handleOnBack}
                                            onChange={handleChangeActiveKey}
                                        />
                                    ) : (
                                        <InfoContainer
                                            onViewChannel={
                                                handleChangeViewChannel
                                            }
                                            socket={socket}
                                        />
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
                                            Khám phá những tiện ích hỗ trợ làm
                                            việc và trò chuyện cùng người thân,
                                            bạn bè được tối ưu hoá cho máy tính
                                            của bạn.
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
        </Spin>
    );
}

export default Chat;
