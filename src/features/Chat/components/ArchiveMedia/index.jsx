import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CaretDownOutlined } from '@ant-design/icons';
import ImageItem from '../ImageItem';
ArchiveMedia.propTypes = {
    viewMediaClick: PropTypes.func,
    name: PropTypes.string,
    items: PropTypes.array,
};

ArchiveMedia.defaultProps = {
    viewMediaClick: null,
    name: '',
    items: [],
};

function ArchiveMedia(props) {
    const { viewMediaClick, name, items } = props;
    const [isDrop, setIsDrop] = useState(true);
    const styleIconDrop = {
        transform: 'rotate(-90deg)',
    };
    const styleInteract = {
        maxHeight: '0px',
    };

    const handleOnClick = () => {
        setIsDrop(!isDrop);
    };

    const handleViewAllOnClick = () => {
        if (viewMediaClick) {
            viewMediaClick(2);
        }
    };

    return (
        <div className='info_media'>
            <div className='info_media-header' onClick={handleOnClick}>
                <div className='info_media-header-title'>{name}</div>

                <div
                    className='info_media-header-icon'
                    style={isDrop ? {} : styleIconDrop}>
                    <CaretDownOutlined />
                </div>
            </div>

            <div
                className='info_media-interact'
                style={isDrop ? {} : styleInteract}>
                <div className='info_media-interact-media'>
                    {items.map((itemEle, index) => (
                        <ImageItem
                            key={index}
                            width={80}
                            height={80}
                            url={itemEle.content}
                        />
                    ))}
                </div>

                <div className='info_media-interact-button'>
                    <button onClick={handleViewAllOnClick}>Xem Tất cả</button>
                </div>
            </div>
        </div>
    );
}

export default ArchiveMedia;
