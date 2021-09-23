import { DoubleLeftOutlined, DownOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import Slider from 'components/Slider';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import io from 'socket.io-client';
import {
    addMessage,
    fetchConversationById,
    removeConversation,
    fetchListFriends,
    setRedoMessage,
    setReactionMessage,
    updateConversationWhenAddMember,
    updateMemberLeaveGroup,
    setSocket
} from './chatSlice';
import BodyChatContainer from './containers/BodyChatContainer';
import ConversationContainer from './containers/ConversationContainer';
import FooterChatContainer from './containers/FooterChatContainer';
import HeaderChatContainer from './containers/HeaderChatContainer';
import InfoContainer from './containers/InfoContainer';
import SearchContainer from './containers/SearchContainer';
import { socket, init } from 'utils/socketClient';
import './style.scss';

init();

// let socket = io(process.env.REACT_APP_API_URL, { transports: ['websocket'] });

Chat.propTypes = {};

function Chat(props) {

    const dispatch = useDispatch();
    const { conversations, currentConversation } = useSelector((state) => state.chat);
    const { path } = useRouteMatch();
    const { user } = useSelector((state) => state.global);
    const [scrollId, setScrollId] = useState('');
    const [idNewMessage, setIdNewMessage] = useState('');
    const [isShow, setIsShow] = useState(false);
    const [isScroll, setIsScroll] = useState(false);
    const [hasMessage, setHasMessage] = useState('');
    const [hasModalMode, setHasModalMode] = useState('Tạo nhóm');
    const [usersTyping, setUsersTyping] = useState([]);


    useEffect(() => {
        console.log('User typing', usersTyping);
    }, [usersTyping]);




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

    const refCurrentConversation = useRef();

    useEffect(() => {
        refCurrentConversation.current = currentConversation;
    }, [currentConversation]);


    useEffect(() => {



        socket.on('new-message', (conversationId, newMessage) => {
            const { type, content, manipulatedUsers } = newMessage;


            if (type === 'NOTIFY' && content === 'Đã thêm vào nhóm') {

                dispatch(updateConversationWhenAddMember({
                    newMembers: manipulatedUsers,
                    conversationId
                }))
            }

            if (type === 'NOTIFY' && content === 'Đã rời khỏi nhóm') {
                dispatch(updateMemberLeaveGroup({
                    conversationId,
                    newMessage,
                }))
            }

            dispatch(addMessage(newMessage));
            setIdNewMessage(newMessage._id);

        });




        socket.on('create-conversation', (conversationId) => {
            dispatch(fetchConversationById({ conversationId }));
        });

        socket.on('delete-conversation', (conversationId) => {
            dispatch(removeConversation(conversationId));
        });


        socket.on('delete-message', (conversationId, id) => {
            handleDeleteMessage(conversationId, id, refCurrentConversation);

        });


        socket.on('added-group', (conversationId) => {

            dispatch(fetchConversationById({ conversationId }));
        });

        socket.on('add-reaction', (conversationId, messageId, user, type) => {
            if (conversationId === refCurrentConversation.current) {
                dispatch(setReactionMessage({ messageId, user, type }));
            }
        });


        socket.on('typing', (conversationId, user) => {

            if (conversationId === refCurrentConversation.current) {

                const index = usersTyping.findIndex(ele => ele._id === user._id);//khoo

                if (usersTyping.length === 0 || index < 0) {

                    setUsersTyping([...usersTyping, user]);
                }
            }
        })

        socket.on('not-typing', (conversationId, user) => {
            if (conversationId === refCurrentConversation.current) {
                const index = usersTyping.findIndex(ele => ele._id === user._id);
                const newUserTyping = usersTyping.filter(ele => ele._id !== user._id);
                console.log('newUserTyping', newUserTyping);
                setUsersTyping(newUserTyping);

            }
        })

    }, []);




    const handleDeleteMessage = (conversationId, id, refCurrentConversation) => {

        if (refCurrentConversation.current === conversationId) {
            dispatch(setRedoMessage(id));
        }

    }


    const handleScrollWhenSent = (value) => {
        setScrollId(value);
    }

    const hanldeOnClickScroll = () => {
        setIsScroll(true);
    }

    const handleBackToBottom = (value, message) => {
        if (message) {
            setHasMessage(message);
        } else {
            setHasMessage('');
        }
        setIsShow(value);
    }

    const hanldeResetScrollButton = (value) => {
        setIsScroll(value);
    }

    // Xử lý modal mode



    return (
        <div id='main-chat-wrapper'>
            <Row gutter={[0, 0]}>
                <Col span={5}>
                    <div className='main-conversation'>
                        <div className='main-conversation_search-bar'>
                            <SearchContainer
                                modalMode={hasModalMode}
                            />
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
                                                className={`${isShow ? 'show' : 'hide'} ${hasMessage ? 'new-message' : ''}`}
                                                onClick={hanldeOnClickScroll}
                                            >
                                                {hasMessage ?
                                                    <div className='db-arrow-new-message'>
                                                        <span className='arrow'><DoubleLeftOutlined /></span>
                                                        <span>&nbsp;{hasMessage}</span>
                                                    </div>

                                                    : <DownOutlined />}
                                            </div>



                                            {usersTyping.length > 0 &&
                                                <div className="typing-message">

                                                    {usersTyping.map((ele, index) => (
                                                        <span>
                                                            {index < 3 &&
                                                                <>
                                                                    {index === usersTyping.length - 1 ? `${ele.name} ` : `${ele.name}, `}
                                                                </>
                                                            }
                                                        </span>
                                                    ))}

                                                    {usersTyping.length > 3 ? `và ${usersTyping.length - 3} người khác` : ''}

                                                    <span>&nbsp;đang nhập</span>


                                                    {/* {usersTyping.map(ele => (
                                                        ele))}
                                                    <div>
                                                        {usersTyping.map((ele, index) => (
                                                            <>
                                                                {
                                                                    index < 3 &&
                                                                    `${index === usersTyping.length - 1 ? ele.name : `${ele.name}, `}`

                                                                }
                                                            </>
                                                        ))}

                                                        {usersTyping.length > 3 && `và ${usersTyping.length - 3}`}


                                                        đang nhập

                                                    </div> */}
                                                    <div className="dynamic-dot">
                                                        <div className='dot'></div>
                                                        <div className='dot'></div>
                                                        <div className='dot'></div>
                                                    </div>
                                                </div>
                                            }



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
