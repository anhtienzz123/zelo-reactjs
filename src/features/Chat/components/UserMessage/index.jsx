import { LikeOutlined, PushpinOutlined, UndoOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Dropdown, Image, Menu } from 'antd';
import { fallback } from 'assets/images/fallbackImage';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { FaReplyAll } from 'react-icons/fa';
import { MdQuestionAnswer } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessageClient } from '../../chatSlice';
import messageApi from 'api/messageApi';
import './style.scss';

UserMessage.propTypes = {
    message: PropTypes.object,
    isMyMessage: PropTypes.bool,
};

UserMessage.defaultProps = {
    message: {},
    isMyMessage: false,
};

const imageStyle = {
    maxHeight: '250px',
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



function UserMessage({ message, isMyMessage }) {
    const { _id, content, user, createdAt, type, isDeleted } = message;
    const { name, avatar } = user;
    const { messages } = useSelector(state => state.chat);
    const dispatch = useDispatch();


    const handleOnClick = async ({ item, key }) => {
        if (key == 1) {

        } else if (key == 2) {
            await messageApi.redoMessage(_id);
        } else if (key == 3) {
            await messageApi.deleteMessageClientSide(_id);
            dispatch(deleteMessageClient(_id))
        }
    }

    //  gọi api
    // hứng socket
    // tìm tin nhắn và set nó đã thu hồi

    const handleUndoMessage = (id) => {


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
    return (
        // <div id={`user-message ${setMarginTopAndBottom(_id)}`}>
        <div id='user-message' className={`${setMarginTopAndBottom(_id)}`}>
            <div
                className={`interact-conversation ${isMyMessage ? 'reverse' : ''
                    }  `}>
                <div className='avatar-user'>
                    <PersonalIcon
                        // isHost={true}
                        demention={40}
                        avatar={avatar}
                    />
                </div>
                <div className='list-conversation'>
                    <div className='message' id={`${_id}`}>
                        <div
                            className={`sub-message ${isMyMessage ? 'reverse' : ''}`}
                        >
                            <div className={`content-message ${(type === 'IMAGE' || type === 'VIDEO') && 'content-media'}`}>
                                <span className='author-message'>{isMyMessage ? '' : name}</span>
                                <div className='content-message-description'>
                                    {
                                        (type === 'HTML') ? parse(content) :

                                            (type === 'TEXT') ? content :

                                                (type === 'IMAGE') ?
                                                    <div className='messsage-image-wrapper'>
                                                        <div className="message-image--main">
                                                            <Image
                                                                // width={200}
                                                                height={200}
                                                                src={content}
                                                                fallback={fallback}
                                                                style={imageStyle}
                                                            />
                                                        </div>

                                                        {(type === 'IMAGE') &&

                                                            <div className={`reaction ${isMyMessage ? 'left' : 'right'} media `}>
                                                                <div className='reaction-thumbnail'>
                                                                    <LikeOutlined />

                                                                    <div className='list_icon-reaction'>
                                                                        <span>👍</span>
                                                                        <span>❤️</span>
                                                                        <span>😆</span>
                                                                        <span>😮</span>
                                                                        <span>😭</span>
                                                                        <span>😡</span>
                                                                    </div>
                                                                </div>
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


                                                            {(type === 'VIDEO') &&

                                                                <div className={`reaction ${isMyMessage ? 'left' : 'right'} media `}>
                                                                    <div className='reaction-thumbnail'>
                                                                        <LikeOutlined />

                                                                        <div className='list_icon-reaction'>
                                                                            <span>👍</span>
                                                                            <span>❤️</span>
                                                                            <span>😆</span>
                                                                            <span>😮</span>
                                                                            <span>😭</span>
                                                                            <span>😡</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div> :
                                                        <div>{content}</div>

                                    }

                                    {
                                        isDeleted && <span className="undo-message">Tin nhắn đã được thu hồi</span>
                                    }

                                </div>

                                {
                                    (type === 'TEXT' || type === 'HTML') &&


                                    <div className={`reaction ${isMyMessage ? 'left' : 'right'} `}>
                                        <div className='reaction-thumbnail'>
                                            <LikeOutlined />

                                            <div className='list_icon-reaction'>
                                                <span>👍</span>
                                                <span>❤️</span>
                                                <span>😆</span>
                                                <span>😮</span>
                                                <span>😭</span>
                                                <span>😡</span>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {/* <div className={`reacted-block ${(type === 'IMAGE' || type === 'VIDEO') && 'media'} ${isMyMessage ? 'left' : 'right'} `}>
                                    <div className='list-user-react'>
                                        <div className='list-user-react-icon'>
                                            <div>
                                                <span>😭</span>
                                                <span>😡</span>
                                                <span className='count-reated'>
                                                    2
                                                </span>
                                            </div>

                                            <div className='list-user-detail'>
                                                <span>Bạn</span>
                                                <span>Tiên Huỳnh</span>
                                                <span>Nhật Hào</span>
                                                <span>Đức Bo</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='your-react'>
                                        <span className='react-current'>
                                            😡
                                        </span>
                                        <div className='list_icon-reaction'>
                                            <span>👍</span>
                                            <span>❤️</span>
                                            <span>😆</span>
                                            <span>😮</span>
                                            <span>😭</span>
                                            <span>😡</span>
                                        </div>
                                    </div>
                                </div> */}

                                <div className='time-send'>
                                    <span>
                                        {dateAt.getHours()}:
                                        {dateAt.getMinutes()}
                                    </span>
                                </div>
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

                        {/* <div className='sub-message'>
                            <div className='content-message'>
                                <span>
                                    Ta thường mơ về một thoáng chốc được bên
                                    nàng
                                </span>

                                <div className='reaction'>
                                    <LikeOutlined />
                                </div>
                            </div>
                            <div className='interaction'>
                                <div className='reply icon-interact'>
                                    <MdQuestionAnswer />
                                </div>

                                <div className='forward icon-interact'>
                                    <FaReplyAll />
                                </div>

                                <div className='additional icon-interact'>
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div>
                        </div>

                        <div className='sub-message '>
                            <div className='content-message'>
                                <span>
                                    Ta thường mơ về một thoáng chốc được bên
                                    nàng Tâm hồn say lạc giữa thành phố một đêm
                                    vàng Giữa một rừng thanh âm chỉ nghe thấy
                                    tiếng em trong vắt
                                </span>

                                <div className='reaction'>
                                    <LikeOutlined />
                                </div>

                                <div className='time-send'>
                                    <span>15:40</span>
                                </div>
                            </div>
                            <div className='interaction'>
                                <div className='reply icon-interact'>
                                    <MdQuestionAnswer />
                                </div>

                                <div className='forward icon-interact'>
                                    <FaReplyAll />
                                </div>

                                <div className='additional icon-interact'>
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserMessage;
