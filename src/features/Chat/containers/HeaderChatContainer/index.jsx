import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useSelector } from 'react-redux';
import HeaderOptional from 'features/Chat/components/HeaderOptional';

HeaderChatContainer.propTypes = {};

function HeaderChatContainer() {
    const { currentConversation, conversations } = useSelector(
        (state) => state.chat
    );
    const detailConver = conversations.find(
        (conver) => conver._id === currentConversation
    );

    return (
        <div id='header-main'>
            <HeaderOptional
                avatar={detailConver.avatar}
                totalMembers={detailConver.totalMembers}
                name={detailConver.name}
                typeConver={detailConver.type}
            />
        </div>
    );
}

export default HeaderChatContainer;
