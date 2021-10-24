import {
    DeleteOutlined,
    PushpinOutlined,
    UndoOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import { message as mesageNotify } from 'antd';
import messageApi from 'api/messageApi';
import pinMessageApi from 'api/pinMessageApi';
import ModalChangePinMessage from 'components/ModalChangePinMessage';
import MESSAGE_STYLE from 'constants/MessageStyle/messageStyle';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaReplyAll } from 'react-icons/fa';
import { MdQuestionAnswer } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { checkLeader } from 'utils/groupUtils';
import { deleteMessageClient, fetchPinMessages } from '../../slice/chatSlice';
import ListReaction from '../ListReaction';
import ListReactionOfUser from '../ListReactionOfUser';
import FileMessage from '../MessageType/FileMessage';
import HTMLMessage from '../MessageType/HTMLMessage';
import ImageMessage from '../MessageType/ImageMessage';
import NotifyMessage from '../MessageType/NotifyMessage';
import TextMessage from '../MessageType/TextMessage';
import VideoMessage from '../MessageType/VideoMessage';
import './style.scss';

UserMessage.propTypes = {
    message: PropTypes.object,
    isMyMessage: PropTypes.bool,
    isSameUser: PropTypes.bool,
    isVisibleTime: PropTypes.bool.isRequired,
    viewUsers: PropTypes.array,
};

UserMessage.defaultProps = {
    message: {},
    isMyMessage: false,
    isSameUser: false,
    viewUsers: [],
};

function UserMessage({
    message,
    isMyMessage,
    isSameUser,
    isVisibleTime,
    viewUsers,
}) {
    const { _id, content, user, createdAt, type, isDeleted, reacts } = message;
    const { name, avatar } = user;
    const { messages, currentConversation, conversations, pinMessages } =
        useSelector((state) => state.chat);
    const global = useSelector((state) => state.global);

    const [listReactionCurrent, setListReactionCurrent] = useState([]);
    const [isLeader, setIsLeader] = useState(false);
    const [isVisbleModal, setVisibleModal] = useState(false);
    const isGroup = conversations.find(
        (ele) => ele._id === currentConversation
    ).type;

    const myReact =
        reacts &&
        reacts.length > 0 &&
        reacts.find((ele) => ele.user._id === global.user._id);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLeader(checkLeader(user._id, conversations, currentConversation));
    }, [messages]);

    const listReaction = ['👍', '❤️', '😆', '😮', '😭', '😡'];

    useEffect(() => {
        let temp = [];
        if (reacts && reacts.length > 0) {
            reacts.forEach((ele) => {
                if (!temp.includes(ele.type)) {
                    temp.push(ele.type);
                }
            });
            setListReactionCurrent(temp);
        }
    }, [message]);

    const transferIcon = (type) => {
        return listReaction[parseInt(type) - 1];
    };

    const handleClickLike = () => {
        sendReaction(1);
    };

    const handleOnCloseModal = () => {
        setVisibleModal(false);
    };

    const handleOnClick = async ({ item, key }) => {
        if (key == 1) {
            if (pinMessages.length === 3) {
                setVisibleModal(true);
            } else {
                try {
                    await pinMessageApi.pinMessage(message._id);
                    dispatch(
                        fetchPinMessages({
                            conversationId: currentConversation,
                        })
                    );
                    mesageNotify.success('Ghim tin nhắn thành công');
                } catch (error) {
                    mesageNotify.error('Ghim tin nhắn thất bại');
                }
            }
        }
        if (key == 2) {
            await messageApi.redoMessage(_id);
        }

        if (key == 3) {
            await messageApi.deleteMessageClientSide(_id);
            dispatch(deleteMessageClient(_id));
        }
    };

    const handleClickReaction = (value) => {
        const type = listReaction.findIndex((element) => element === value) + 1;
        sendReaction(type);
    };

    const sendReaction = async (type) => {
        await messageApi.dropReaction(_id, type);
    };

    const menu = (
        <Menu onClick={handleOnClick}>
            {isGroup && (
                <Menu.Item
                    key="1"
                    icon={<PushpinOutlined />}
                    style={MESSAGE_STYLE.dropDownStyle}
                    title="Ghim tin nhắn"
                >
                    Ghim tin nhắn
                </Menu.Item>
            )}

            {isMyMessage && (
                <Menu.Item
                    key="2"
                    icon={<UndoOutlined />}
                    style={MESSAGE_STYLE.dropDownStyle}
                    title="Thu hồi tin nhắn"
                >
                    Thu hồi tin nhắn
                </Menu.Item>
            )}
            <Menu.Item
                key="3"
                icon={<DeleteOutlined />}
                style={MESSAGE_STYLE.dropDownStyle}
                danger
                title="Chỉ xóa ở phía tôi"
            >
                Chỉ xóa ở phía tôi
            </Menu.Item>
        </Menu>
    );

    const setMarginTopAndBottom = (id) => {
        const index = messages.findIndex((message) => message._id === id);
        if (index === 0) {
            return 'top';
        }
        if (index === messages.length - 1) {
            return 'bottom';
        }
        return '';
    };

    const dateAt = new Date(createdAt);

    return (
        <>
            {!isDeleted && type === 'NOTIFY' ? (
                <NotifyMessage message={message} />
            ) : (
                <div
                    id="user-message"
                    className={`${setMarginTopAndBottom(_id)}`}
                >
                    <div
                        className={`interact-conversation ${
                            isMyMessage ? 'reverse' : ''
                        }  `}
                    >
                        <div
                            className={`avatar-user ${
                                isSameUser ? 'hidden' : ''
                            }`}
                        >
                            <PersonalIcon
                                isHost={isLeader}
                                demention={40}
                                avatar={avatar}
                            />
                        </div>
                        <div className="list-conversation">
                            <div className="message" id={`${_id}`}>
                                <div
                                    className={`sub-message ${
                                        isMyMessage ? 'reverse' : ''
                                    } ${isSameUser ? 'same-user' : ''}`}
                                >
                                    <div
                                        className={`content-message ${
                                            type === 'IMAGE' || type === 'VIDEO'
                                                ? 'content-media'
                                                : ''
                                        } 
                                        ${
                                            isMyMessage &&
                                            type !== 'IMAGE' &&
                                            type !== 'VIDEO'
                                                ? 'my-message-bg'
                                                : ''
                                        }`}
                                    >
                                        <span className="author-message">
                                            {isSameUser && isMyMessage
                                                ? ''
                                                : isSameUser && !isMyMessage
                                                ? ''
                                                : !isSameUser && isMyMessage
                                                ? ''
                                                : name}
                                        </span>
                                        <div className="content-message-description">
                                            {isDeleted ? (
                                                <span className="undo-message">
                                                    Tin nhắn đã được thu hồi
                                                </span>
                                            ) : (
                                                <>
                                                    {type === 'HTML' ? (
                                                        <HTMLMessage
                                                            content={content}
                                                            dateAt={dateAt}
                                                        >
                                                            {!myReact && (
                                                                <ListReaction
                                                                    isMyMessage={
                                                                        isMyMessage
                                                                    }
                                                                    onClickLike={
                                                                        handleClickLike
                                                                    }
                                                                    listReaction={
                                                                        listReaction
                                                                    }
                                                                    onClickReaction={
                                                                        handleClickReaction
                                                                    }
                                                                />
                                                            )}
                                                        </HTMLMessage>
                                                    ) : type === 'TEXT' ? (
                                                        <TextMessage
                                                            content={content}
                                                            dateAt={dateAt}
                                                            isVisibleTime={
                                                                isVisibleTime
                                                            }
                                                        >
                                                            {!myReact && (
                                                                <ListReaction
                                                                    isMyMessage={
                                                                        isMyMessage
                                                                    }
                                                                    onClickLike={
                                                                        handleClickLike
                                                                    }
                                                                    listReaction={
                                                                        listReaction
                                                                    }
                                                                    onClickReaction={
                                                                        handleClickReaction
                                                                    }
                                                                />
                                                            )}
                                                        </TextMessage>
                                                    ) : type === 'IMAGE' ? (
                                                        <ImageMessage
                                                            content={content}
                                                            dateAt={dateAt}
                                                        >
                                                            {type === 'IMAGE' &&
                                                                !myReact && (
                                                                    <ListReaction
                                                                        type="media"
                                                                        isMyMessage={
                                                                            isMyMessage
                                                                        }
                                                                        onClickLike={
                                                                            handleClickLike
                                                                        }
                                                                        listReaction={
                                                                            listReaction
                                                                        }
                                                                        onClickReaction={
                                                                            handleClickReaction
                                                                        }
                                                                    />
                                                                )}
                                                        </ImageMessage>
                                                    ) : type === 'VIDEO' ? (
                                                        <VideoMessage
                                                            content={content}
                                                            dateAt={dateAt}
                                                        >
                                                            {!myReact && (
                                                                <ListReaction
                                                                    type="media"
                                                                    isMyMessage={
                                                                        isMyMessage
                                                                    }
                                                                    onClickLike={
                                                                        handleClickLike
                                                                    }
                                                                    listReaction={
                                                                        listReaction
                                                                    }
                                                                    onClickReaction={
                                                                        handleClickReaction
                                                                    }
                                                                />
                                                            )}
                                                        </VideoMessage>
                                                    ) : (
                                                        <FileMessage
                                                            content={content}
                                                            isVisibleTime={
                                                                isVisibleTime
                                                            }
                                                            dateAt={dateAt}
                                                        >
                                                            {!myReact && (
                                                                <ListReaction
                                                                    type="media"
                                                                    isMyMessage={
                                                                        isMyMessage
                                                                    }
                                                                    onClickLike={
                                                                        handleClickLike
                                                                    }
                                                                    listReaction={
                                                                        listReaction
                                                                    }
                                                                    onClickReaction={
                                                                        handleClickReaction
                                                                    }
                                                                />
                                                            )}
                                                        </FileMessage>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <div
                                            className={`reacted-block ${
                                                (type === 'IMAGE' ||
                                                    type === 'VIDEO') &&
                                                'media'
                                            } 
                                            ${isMyMessage ? 'left' : 'right'} `}
                                        >
                                            {listReactionCurrent.length > 0 &&
                                                !isDeleted && (
                                                    <ListReactionOfUser
                                                        listReactionCurrent={
                                                            listReactionCurrent
                                                        }
                                                        reacts={reacts}
                                                        isMyMessage={
                                                            isMyMessage
                                                        }
                                                        onTransferIcon={
                                                            transferIcon
                                                        }
                                                    />
                                                )}

                                            {myReact && !isDeleted && (
                                                <div
                                                    className={`your-react ${
                                                        isMyMessage
                                                            ? 'bg-white'
                                                            : ''
                                                    }`}
                                                >
                                                    <span className="react-current">
                                                        {myReact
                                                            ? transferIcon(
                                                                  myReact.type
                                                              )
                                                            : ''}
                                                    </span>

                                                    <ListReaction
                                                        isMyMessage={
                                                            isMyMessage
                                                        }
                                                        onClickLike={
                                                            handleClickLike
                                                        }
                                                        listReaction={
                                                            listReaction
                                                        }
                                                        onClickReaction={
                                                            handleClickReaction
                                                        }
                                                        isLikeButton={false}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        className={`interaction ${
                                            isDeleted ? 'hidden' : ''
                                        }`}
                                    >
                                        <div className="reply icon-interact">
                                            <Button
                                                style={
                                                    MESSAGE_STYLE.styleButton
                                                }
                                            >
                                                <MdQuestionAnswer />
                                            </Button>
                                        </div>

                                        <div className="forward icon-interact">
                                            <Button
                                                style={
                                                    MESSAGE_STYLE.styleButton
                                                }
                                            >
                                                <FaReplyAll />
                                            </Button>
                                        </div>

                                        <div className="additional icon-interact">
                                            <Dropdown
                                                overlay={menu}
                                                trigger={['click']}
                                            >
                                                <Button
                                                    style={
                                                        MESSAGE_STYLE.styleButton
                                                    }
                                                >
                                                    <BiDotsHorizontalRounded />
                                                </Button>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {viewUsers &&
                        viewUsers.map((ele) => (
                            <div>
                                <p>{ele.name} đã xem</p>
                            </div>
                        ))}
                </div>
            )}
            {/* {type === 'NOTIFY' ? (
                <NotifyMessage message={message} />
            ) : (
                
            )} */}

            <ModalChangePinMessage
                message={pinMessages}
                visible={isVisbleModal}
                idMessage={_id}
                onCloseModal={handleOnCloseModal}
            />
        </>
    );
}

export default UserMessage;
