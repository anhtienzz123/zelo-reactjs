import { CheckCircleFilled, ShareAltOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import IMAGE_ITEM_STYLE from './ImageItemStyle';
import OverlayImage from 'components/OverlayImage';
import { fallback } from 'constants/images'
import './style.scss';

ImageItem.propTypes = {
    url: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
};

ImageItem.defaultProps = {
    url: 'https://kenh14cdn.com/thumb_w/660/2020/7/23/h2-1595477334052655614583.jpg',
    height: 110,
    width: 110,
};

function ImageItem(props) {
    const { url, height, width } = props;
    const [select, setSelect] = useState(false);

    const dementionStyle = {
        width: width,
        height: height,
    }

    const selectStyle = {
        color: '#4c92ff',
    }

    const handleShareImage = () => {

    }

    const handleSelectImage = () => {
        setSelect(!select);
    }


    return (
        <div className="item-img-wrapper">
            <div className="item-img-interact">

                <div
                    className="top-select_button "
                    onClick={handleSelectImage}
                    style={select ? selectStyle : {}}
                >
                    <CheckCircleFilled />
                </div>

                <div
                    onClick={handleShareImage}
                    className="top-share_button"
                >
                    <ShareAltOutlined />
                </div>

            </div>

            <div
                id='item-img'
                style={dementionStyle}
            >

                <Image
                    style={IMAGE_ITEM_STYLE.IMAGE}
                    src={url}
                    fallback={fallback}
                    width={width}
                    height={height}
                    preview={{ mask: <OverlayImage /> }}
                />
            </div>
        </div>
    );
}

export default ImageItem;