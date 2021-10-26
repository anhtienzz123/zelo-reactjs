import { CaretDownOutlined, NumberOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ChannelItem from '../ChannelItem';

Channel.propTypes = {
    onViewChannel: PropTypes.func,
};


Channel.defaultProps = {
    onViewChannel: null,
};




const styleIconDrop = {
    transform: 'rotate(-90deg)'
}

const styleInteract = {
    maxHeight: "0px",
}


function Channel({ onViewChannel }) {

    const [isDrop, setIsDrop] = useState(true);



    const handleViewChannel = () => {

    }

    const handleOnClick = () => {
        setIsDrop(!isDrop);
    }

    const handleViewAll = () => {
        if (onViewChannel) {
            onViewChannel()
        }
    }
    const handleAddChannel = () => {

    }

    return (
        <div className="channel">
            <div
                className="channel-header"
                onClick={handleOnClick}
            >
                <div className="channel-header-title">
                    Kênh
                    <span className="total-channel-notify">(Có 20 thông báo)</span>
                </div>

                <div
                    className="channel-header-icon"
                    style={isDrop ? {} : styleIconDrop}
                >
                    <CaretDownOutlined />
                </div>
            </div>

            <div
                className="channel-interact"
                style={isDrop ? {} : styleInteract}
            >

                <div className="channel-interact-amount active" onClick={handleViewChannel}>
                    <div className="channel-interact-amount-icon">
                        <NumberOutlined />
                    </div>

                    <div className="channel-interact-amount-text">
                        <span>Kênh chung</span>

                    </div>


                </div>


                <ChannelItem />

                <ChannelItem />





                <div className="channel-interact-amount" onClick={handleViewChannel}>
                    <div className="channel-interact-amount-icon">
                        <NumberOutlined />
                    </div>

                    <div className="channel-interact-amount-text">
                        <span>làm dự án</span>
                    </div>
                </div>

                <div className='channel-interact-button'>
                    <button onClick={handleAddChannel}>Thêm Channel</button>
                </div>

                <div className='channel-interact-button'>
                    <button onClick={handleViewAll}>Xem Tất cả</button>
                </div>
            </div>

        </div>
    );
}

export default Channel;