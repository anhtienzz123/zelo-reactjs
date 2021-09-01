import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CaretDownOutlined } from '@ant-design/icons';
import ImageItem from '../ImageItem';
ArchiveMedia.propTypes = {
    viewMediaClick: PropTypes.func,
};

ArchiveMedia.defaultProps = {
    viewMediaClick: null
};


function ArchiveMedia(props) {
    const { viewMediaClick } = props;
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

    const handleViewAllOnClick = () => {
        if (viewMediaClick) {
            viewMediaClick(2);
        }
    }

    return (
        <div className="info_media">
            <div
                className="info_media-header"
                onClick={handleOnClick}
            >
                <div className="info_media-header-title">
                    Ảnh/Video
                </div>

                <div className="info_media-header-icon" style={isDrop ? { } : styleIconDrop}>
                    <CaretDownOutlined />
                </div>
            </div>

            <div className="info_media-interact" style={isDrop ? { } : styleInteract}>
                <div className="info_media-interact-media">
                    <ImageItem width={80} height={80} />
                    <ImageItem width={80} height={80} />
                    <ImageItem width={80} height={80} />
                    <ImageItem width={80} height={80} />

                    <ImageItem width={80} height={80} />
                    <ImageItem width={80} height={80} />
                    <ImageItem width={80} height={80} />
                    <ImageItem width={80} height={80} />
                  
                </div>

                <div className="info_media-interact-button">
                    <button onClick={handleViewAllOnClick}>
                        Xem Tất cả
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArchiveMedia;