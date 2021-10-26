import React from 'react';
import PropTypes from 'prop-types';

import { NumberOutlined } from '@ant-design/icons';
import './style.scss';

ChannelItem.propTypes = {

};

function ChannelItem(props) {


    const handleViewChannel = () => {

    }
    return (
        <div className="channel-item" onClick={handleViewChannel}>
            <div className="channel-item-icon">
                <NumberOutlined />
            </div>

            <div className="channel-item-text">
                <span>làm giao diện</span>
            </div>

            <div className='notify-amount'>
                2
            </div>
        </div>
    );
}

export default ChannelItem;