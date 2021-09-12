import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import DividerCustom from '../DividerCustom';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import { FaReplyAll } from 'react-icons/fa';
import { MdQuestionAnswer } from 'react-icons/md';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import { Button, Image, Popover } from 'antd';
import { date } from 'yup/lib/locale';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { fallback } from 'assets/images/fallbackImage';

UserMessage.propTypes = {
    message: PropTypes.object,
    isMyMessage: PropTypes.bool,
};

UserMessage.defaultProps = {
    message: {},
    isMyMessage: false,
};

function UserMessage({ message, isMyMessage }) {
    const { _id, content, user, createdAt, type } = message;
    const { name, avatar } = user;
    const { messages } = useSelector(state => state.chat);


    const setMarginTopAndBottom = (id) => {
        const index = messages.findIndex(message => message._id === id);
        if (index === 0) {
            return 'top';
        }

        if (index === messages.length - 1) {
            return 'bottom';
        }
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
                        isHost={true}
                        demention={40}
                        avatar={avatar}
                    />
                </div>
                <div className='list-conversation'>
                    <div className='message' id={`${_id}`}>
                        <div
                            className={`sub-message ${isMyMessage ? 'reverse' : ''
                                }   `}>
                            <div className='content-message'>
                                <span className='author-message'>{name}</span>
                                <div className='content-message-description'>
                                    {
                                        (type === 'HTML') ?
                                            parse(content) :
                                            (type === 'TEXT') ?
                                                content :
                                                (type === 'IMAGE') ?
                                                    <Image
                                                        width={200}
                                                        height={200}
                                                        src={content}
                                                        fallback={fallback}
                                                    />
                                                    :
                                                    (type === 'VIDEO') ?
                                                        <video controls style={{ maxHeight: '240px', maxWidth: '100%' }} >
                                                            <source src={content} type="video/mp4" />
                                                        </video> :
                                                        <div>{content}</div>

                                    }

                                </div>

                                <div className='reaction'>
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

                                <div className='reacted-block'>
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
                                </div>

                                <div className='time-send'>
                                    <span>
                                        {dateAt.getHours()}:
                                        {dateAt.getMinutes()}
                                    </span>
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
