import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import ConversationAvatar from '../ConversationAvatar';
import { useSelector } from 'react-redux';
import { TagTwoTone } from '@ant-design/icons';
import './style.scss';
ConversationSingle.propTypes = {
    conversation: PropTypes.object,
    onClick: PropTypes.func,
};

function ConversationSingle({ conversation, onClick }) {
    const { _id, name, avatar, numberUnread, lastMessage, totalMembers } =
        conversation;
    const { content, type, createdAt, user } = lastMessage;
    const global = useSelector((state) => state.global);


    const handleClick = () => {
        if (onClick) onClick(_id);
    };

    return (
        <div className='conversation-item_box' onClick={handleClick}>
            <div className='left-side-box'>
                <div className='icon-users'>
                    <ConversationAvatar avatar={avatar} />
                </div>
            </div>

            {lastMessage ? (
                <>
                    <div className='middle-side-box'>
                        <span className='name-box'>{name}</span>

                        <div className='lastest-message'>
                            <span className='tag-classify'>
                                <TagTwoTone twoToneColor='#db342e' />
                            </span>
                            <span>
                                {`${global.user.name === user.name
                                        ? 'Bạn'
                                        : user.name
                                    }:${content ? content : 'Tin nhắn đã thu hồi'}`}
                            </span>
                        </div>
                    </div>

                    <div className='right-side-box'>
                        <span className='lastest-time'>{createdAt}</span>

                        <span className='message-count'>{numberUnread}</span>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    );
}

export default ConversationSingle;
