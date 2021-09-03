import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

ConversationAvatar.propTypes = {
    avatar: PropTypes.array || PropTypes.string,
};

ConversationAvatar.defaultProps = {};

function ConversationAvatar({ avatar }) {
    const typeOf = typeof avatar;

    return (
        <div>
            {typeOf === 'string' ? (
                <Avatar size={48} src={avatar} />
            ) : (
                <Avatar.Group
                    maxCount={3}
                    size={28}
                    maxPopoverPlacement='bottom'>
                    {avatar.map((avatarEle, index) => (
                        <Avatar size={28} src={avatarEle} />
                    ))}
                </Avatar.Group>
            )}
        </div>
    );
}

export default ConversationAvatar;
