import { LikeOutlined, PushpinOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Dropdown, Image, Menu } from 'antd';
import { fallback } from 'assets/images/fallbackImage';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaReplyAll } from 'react-icons/fa';
import { MdQuestionAnswer } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessageClient } from '../../chatSlice';
import messageApi from 'api/messageApi';
import { Avatar, Divider, Tooltip } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import './style.scss';

UserMessage.propTypes = {
    message: PropTypes.object,
    isMyMessage: PropTypes.bool,
    isSameUser: PropTypes.bool
};

UserMessage.defaultProps = {
    message: {},
    isMyMessage: false,
    isSameUser: false
};

const imageStyle = {
    maxHeight: '300px',
    maxWidth: '100%',
    borderRadius: '8px'

}

const videoStyle = {
    maxHeight: '240px',
    maxWidth: '100%',
    borderRadius: '8px',

}

const styleButton = {
    background: 'none',
    outline: 'none',
    padding: '0px',
    border: 'none',

    fontSize: '1.7rem',
    color: '#606c7a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const dropDownStyle = {
    fontWeight: '500',
    fontSize: '1.3rem'
}



function UserMessage({ message, isMyMessage, isSameUser }) {
    const { _id, content, user, createdAt, type, isDeleted, reacts, manipulatedUsers } = message;
    const { name, avatar } = user;
    const { messages } = useSelector(state => state.chat);
    const global = useSelector(state => state.global);



    const [listReactionCurrent, setListReactionCurrent] = useState([]);

    const myReact = reacts && reacts.length > 0 && reacts.find(ele => ele.user._id === global.user._id);
    const dispatch = useDispatch();

    const listReaction = ['👍', '❤️', '😆', '😮', '😭', '😡'];
    useEffect(() => {
        let temp = []
        if (reacts && reacts.length > 0) {
            reacts.forEach(ele => {
                if (!temp.includes(ele.type)) {
                    temp.push(ele.type);
                }
            });

            setListReactionCurrent(temp);
        }

    }, [message])

    const transferIcon = (type) => {
        return listReaction[parseInt(type) - 1];
    }

    const handleClickLike = () => {
        sendReaction(1);
    }

    const handleOnClick = async ({ item, key }) => {
        if (key === 1) {

        } else if (key === 2) {
            await messageApi.redoMessage(_id);
        } else if (key === 3) {
            await messageApi.deleteMessageClientSide(_id);
            dispatch(deleteMessageClient(_id))
        }
    }

    const handleClickReaction = (value) => {
        const type = listReaction.findIndex(element => element === value) + 1;
        sendReaction(type);
    }

    const sendReaction = async (type) => {
        await messageApi.dropReaction(_id, type);
    }



    const menu = (
        <Menu onClick={handleOnClick}>
            <Menu.Item key='1' icon={<PushpinOutlined />} style={dropDownStyle} title='Ghim tin nhắn'>Ghim tin nhắn</Menu.Item>
            {isMyMessage && <Menu.Item key='2' icon={<UndoOutlined />} style={dropDownStyle} title='Thu hồi tin nhắn'>Thu hồi tin nhắn</Menu.Item>}
            <Menu.Item key='3' icon={<DeleteOutlined />} style={dropDownStyle} danger title='Chỉ xóa ở phía tôi'>Chỉ xóa ở phía tôi</Menu.Item>
        </Menu>
    );




    const setMarginTopAndBottom = (id) => {
        const index = messages.findIndex(message => message._id === id);
        if (index === 0) {
            return 'top';
        }

        if (index === messages.length - 1) {
            return 'bottom';
        }
        return '';
    }

    const dateAt = new Date(createdAt);


    const transferTextToValue = (text) => {
        if (text === 'Đã thêm vào nhóm') {
            return 1;
        }

        if (text === 'Đã xóa ra khỏi nhóm') {
            return 2;
        }

        if (text === 'Đã tạo nhóm') {
            return 3;
        }
        if (text === 'Đã tham gia nhóm') {
            return 4;
        }

        if (text === 'Đã rời khỏi nhóm') {
            return 5;
        }
    }


    const manipulateUserName = manipulatedUsers && manipulatedUsers.length > 0 &&
        manipulatedUsers.map(ele => ele.name);


    // .join(' ,')

    // ;
    const isMyActive = user._id === global.user._id ? 'Bạn' : user.name;
    // console.log('manipulateUserName', manipulateUserName);












    return (
        <>
            {type === 'NOTIFY' ?
                (<div className='notify-message-wrapper'>

                    {/* {manipulateUserName} */}


                    <div className="notify-message-content">
                        <div className="notify-message-content_group-avatar">

                            {
                                (transferTextToValue(content) === 3 || transferTextToValue(content) === 5) &&
                                <div div className="notify-message-content_per-avatar" >
                                    <Avatar
                                        size='small'
                                        src={avatar}
                                    />
                                </div>


                            }



                            {(manipulatedUsers && manipulatedUsers.length > 0) &&
                                (
                                    manipulatedUsers.map((ele, index) => (
                                        <>
                                            {
                                                index < 3 &&
                                                <div div className="notify-message-content_per-avatar" >
                                                    <Avatar
                                                        size='small'
                                                        src={ele.avatar}
                                                    />
                                                </div>

                                            }
                                        </>
                                    ))
                                )
                            }


                            {(manipulatedUsers && manipulatedUsers.length > 3) &&

                                <div className="notify-message-content_per-avatar">
                                    <Tooltip placement="top">
                                        <Avatar
                                            style={{
                                                backgroundColor: '#f56a00',
                                                color: '#fff'
                                            }}
                                            size='small'

                                        >
                                            {`+${manipulatedUsers.length - 3}`}
                                        </Avatar>
                                    </Tooltip>
                                </div>
                            }

                        </div>


                        <div className="notify-message-content-title">
                            <span>


                                {
                                    <>
                                        <span className="user-name-strong">{isMyActive}</span>&nbsp;
                                        <span>{transferTextToValue(content) === 1 ? 'đã thêm'
                                            : (transferTextToValue(content) === 2) ? 'đã xóa'
                                                : (transferTextToValue(content) === 3) ? 'đã tạo nhóm' : ''}</span>
                                    </>
                                }



                                {manipulatedUsers && manipulatedUsers.length > 0 &&
                                    manipulatedUsers.map((ele, index) => (
                                        <span className="user-name-strong">
                                            {index < 3 &&
                                                (index === 0) ? ` ${ele._id === global.user._id ? 'bạn' : ele.name}` : `, ${ele._id === global.user._id ? 'bạn' : ele.name}`
                                            }
                                        </span>
                                    ))
                                }


                                {
                                    manipulatedUsers && manipulatedUsers.length > 3 &&
                                    <span className="user-name-strong">

                                        {` và`} <span className='blue'>{`${manipulatedUsers.length - 3} người khác`}</span>
                                    </span>
                                }



                                {
                                    transferTextToValue(content) === 5 ? 'đã rời khỏi nhóm' : ''
                                }

                            </span>
                        </div>


                    </div>






                </div>) :
                <div id='user-message' className={`${setMarginTopAndBottom(_id)}`}>
                    <div
                        className={`interact-conversation ${isMyMessage ? 'reverse' : ''
                            }  `}>
                        <div className={`avatar-user ${isSameUser ? 'hidden' : ''}`}>
                            <PersonalIcon
                                // isHost={true}
                                demention={40}
                                avatar={avatar}
                            />
                        </div>
                        <div className='list-conversation'>
                            <div className='message' id={`${_id}`}>
                                <div
                                    className={`sub-message ${isMyMessage ? 'reverse' : ''} ${isSameUser ? 'same-user' : ''}`}
                                >
                                    <div
                                        className={`content-message ${(type === 'IMAGE' || type === 'VIDEO') ? 'content-media' : ''} 
                                ${(isMyMessage && type !== 'IMAGE' && type !== 'VIDEO') ? 'my-message-bg' : ''}`}
                                    >
                                        <span className='author-message'>
                                            {isSameUser && isMyMessage ? '' :
                                                isSameUser && !isMyMessage ? '' :
                                                    !isSameUser && isMyMessage ? '' : name

                                            }
                                        </span>
                                        <div className='content-message-description'>
                                            {
                                                (type === 'HTML') ? parse(content) :

                                                    (type === 'TEXT') ? content :

                                                        (type === 'IMAGE') ?
                                                            <div className='messsage-image-wrapper'>
                                                                <div className="message-image--main">
                                                                    <Image


                                                                        src={content}
                                                                        fallback={fallback}
                                                                        style={imageStyle}
                                                                    />
                                                                </div>

                                                                {(type === 'IMAGE') && !myReact &&

                                                                    <div className={`reaction ${isMyMessage ? 'left' : 'right'} media `}>
                                                                        {<div className='reaction-thumbnail' onClick={handleClickLike}>
                                                                            <LikeOutlined />

                                                                            <div className='list_icon-reaction'>
                                                                                {listReaction.map(ele => (
                                                                                    <span onClick={() => handleClickReaction(ele)}>{ele}</span>
                                                                                ))}
                                                                            </div>
                                                                        </div>}
                                                                    </div>
                                                                }


                                                            </div> :

                                                            (type === 'VIDEO') ?
                                                                <div className="message-video-wrapper">
                                                                    <div className="message-video-main">
                                                                        <video controls style={videoStyle} >
                                                                            <source src={content} type="video/mp4" />
                                                                        </video>
                                                                    </div>

                                                                    {!myReact &&
                                                                        <div className={`reaction ${isMyMessage ? 'left' : 'right'} media `}>
                                                                            <div className='reaction-thumbnail' onClick={handleClickLike}>
                                                                                <LikeOutlined />

                                                                                <div className='list_icon-reaction'>
                                                                                    {listReaction.map(ele => (
                                                                                        <span onClick={() => handleClickReaction(ele)}>{ele}</span>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    }                                                        </div> :
                                                                <div>{content}</div>

                                            }

                                            {
                                                isDeleted && <span className="undo-message">Tin nhắn đã được thu hồi</span>
                                            }

                                        </div>


                                        {
                                            (reacts && reacts.length > 0 && (type !== 'IMAGE' || type !== 'VIDEO')) &&
                                            <div className='time-send'>
                                                <span>
                                                    {`0${dateAt.getHours()}`.slice(-2)}:
                                                    {`0${dateAt.getMinutes()}`.slice(-2)}
                                                </span>
                                            </div>

                                        }

                                        {
                                            (type === 'TEXT' || type === 'HTML') && !myReact &&


                                            <div className={`reaction ${isMyMessage ? 'left' : 'right'} `}>

                                                <div className='reaction-thumbnail' onClick={handleClickLike}>
                                                    <LikeOutlined />

                                                    <div className='list_icon-reaction'>
                                                        {listReaction.map(ele => (
                                                            <span onClick={() => handleClickReaction(ele)}>{ele}</span>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        }

                                        <div className={`reacted-block ${(type === 'IMAGE' || type === 'VIDEO') && 'media'} ${isMyMessage ? 'left' : 'right'} `}>
                                            {
                                                listReactionCurrent.length > 0 && !isDeleted && (
                                                    <div className={`list-user-react ${(isMyMessage) ? 'bg-white' : ''}`}>
                                                        <div className='list-user-react-icon'>
                                                            <div>
                                                                {
                                                                    listReactionCurrent.map(ele => (
                                                                        <span>{transferIcon(ele)}</span>

                                                                    ))
                                                                }
                                                                <span className='count-reated'>
                                                                    {reacts && reacts.length > 0 && reacts.length}
                                                                </span>
                                                            </div>

                                                            <div className='list-user-detail'>
                                                                {reacts && reacts.length > 0 &&
                                                                    reacts.map((ele, index) => (
                                                                        <>
                                                                            {index < 5 && <span>{ele.user.name}</span>}
                                                                        </>
                                                                    ))

                                                                }
                                                                {reacts && reacts.length > 5 &&
                                                                    <span>{`và ${reacts.length - 5} người khác`}</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            {myReact && !isDeleted && (
                                                <div className={`your-react ${isMyMessage ? 'bg-white' : ''}`}>
                                                    <span className='react-current'>
                                                        {myReact ? transferIcon(myReact.type) : ''}
                                                    </span>
                                                    <div className='list_icon-reaction'>
                                                        {listReaction.map(ele => (
                                                            <span onClick={() => handleClickReaction(ele)}>{ele}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )

                                            }
                                        </div>

                                        {
                                            (reacts && reacts.length <= 0 && (type === 'IMAGE' || type === 'VIDEO')) &&
                                            <div className='time-send'>
                                                <span>
                                                    {`0${dateAt.getHours()}`.slice(-2)}:
                                                    {`0${dateAt.getMinutes()}`.slice(-2)}
                                                </span>
                                            </div>

                                        }
                                    </div>

                                    <div
                                        className={`interaction ${isDeleted ? 'hidden' : ''}`}

                                    >
                                        <div className='reply icon-interact'>
                                            <Button
                                                style={styleButton}

                                            >
                                                <MdQuestionAnswer />
                                            </Button>
                                        </div>



                                        <div className='forward icon-interact'>
                                            <Button
                                                style={styleButton}


                                            >
                                                <FaReplyAll />
                                            </Button>
                                        </div>

                                        <div className='additional icon-interact'>
                                            {/* <BiDotsHorizontalRounded /> */}
                                            <Dropdown
                                                overlay={menu}
                                                trigger={['click']}
                                            >
                                                <Button
                                                    // type='text'
                                                    style={styleButton}

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
                </div>
            }
        </>
    );
}

export default UserMessage;
