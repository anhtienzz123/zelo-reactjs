import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CaretDownOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import './style.scss';
AnotherSetting.propTypes = {

};

function AnotherSetting(props) {
    const [isDrop, setIsDrop] = useState(true);
    const styleIconDrop = {

        transform: 'rotate(-90deg)'
    }

    const styleInteract = {
        maxHeight: "0px",


    }


    const handleOnClick = () => {
        setIsDrop(!isDrop);
    }

    return (
        <div className="info_setting">
            <div
                className="info_setting-header"
                onClick={handleOnClick}
            >
                <div className="info_setting-header-title">
                    Cài đặt khác
                </div>

                <div className="info_setting-header-icon" style={isDrop ? { } : styleIconDrop}>
                    <CaretDownOutlined />
                </div>
            </div>

            <div className="info_setting-interact" style={isDrop ? { } : styleInteract}>
                <div className="info_setting-interact-amount danger">
                    <div className="info_setting-interact-amount-icon">
                        <ExportOutlined />
                    </div>

                    <div className="info_setting-interact-amount-text">
                        <span>Rời nhóm</span>
                    </div>
                </div>


                <div className="info_setting-interact-amount danger">
                    <div className="info_setting-interact-amount-icon">
                        <DeleteOutlined />
                    </div>

                    <div className="info_setting-interact-amount-text">
                        <span>Xóa cuộc trò chuyện</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnotherSetting;