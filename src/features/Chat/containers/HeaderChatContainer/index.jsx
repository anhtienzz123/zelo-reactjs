import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useSelector } from 'react-redux';
import HeaderOptional from 'features/Chat/components/HeaderOptional';

HeaderChatContainer.propTypes = {};

function HeaderChatContainer() {

    const [detailConver, setDetailConver] = useState({})
    const { currentConversation, conversations, memberInConversation } = useSelector(
        (state) => state.chat
    );

    useEffect(() => {
        if (currentConversation) {
            const tempConver = conversations.find(
                (conver) => conver._id === currentConversation
            );
            if (tempConver) {
                setDetailConver(tempConver);
            }
        }
    }, [currentConversation, conversations])


    return (
        <div id='header-main'>
            <HeaderOptional
                avatar={detailConver.avatar}
                totalMembers={memberInConversation.length}
                name={detailConver.name}
                typeConver={detailConver.type}
                isLogin={detailConver?.isOnline}
                lastLogin={detailConver?.lastLogin}
                avatarColor={detailConver?.avatarColor}
            />
        </div>
    );
}

export default HeaderChatContainer;
