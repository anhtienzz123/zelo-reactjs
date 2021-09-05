import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { useSelector } from 'react-redux';
import HeaderOptional from 'features/Chat/components/HeaderOptional';

HeaderChatContainer.propTypes = {

};

function HeaderChatContainer(props) {

    const { currentConversation, conversations } = useSelector(state => state.chat);
    const detailConver = conversations.find(conver => conver._id === currentConversation);

    console.log("Detail conversation", detailConver);




    return (
        <div id='header-main'>
            <HeaderOptional
                avatar={detailConver.avatar}
                totalMembers={detailConver.totalMembers}
                name={detailConver.name}
            />
        </div>
    );
}

export default HeaderChatContainer;