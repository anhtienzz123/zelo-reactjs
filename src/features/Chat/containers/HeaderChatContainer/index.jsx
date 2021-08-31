import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MessageOutlined } from '@ant-design/icons';
import './style.scss';
import HeaderOptional from 'features/Chat/components/HeaderOptional';

HeaderChatContainer.propTypes = {

};

function HeaderChatContainer(props) {
    return (
        <div id='header-main'>
            <HeaderOptional
                group={true}
                members={5}

            />
        </div>
    );
}

export default HeaderChatContainer;