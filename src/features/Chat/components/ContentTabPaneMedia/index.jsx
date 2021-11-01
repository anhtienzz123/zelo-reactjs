import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../ImageItem';
import './style.scss';
import { Image } from 'antd';
import ModalVideoCustom from 'components/ModalVideoCustom';
ContentTabPaneMedia.propTypes = {
    items: PropTypes.array,
};

ContentTabPaneMedia.defaultProps = {
    items: [],
};

function ContentTabPaneMedia(props) {
    const { items } = props;
    const [visible, setVisible] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');

    const handleVisibleModal = (url) => {
        setVisible(true);
        setCurrentVideo(url);

    }

    const handleOnClose = () => {
        setVisible(false);
        setCurrentVideo('');
    }

    return (
        <div id='content-tabpane-media-wrapper'>
            <div className='item-in-archive-media'>
                <div className='list-item-sent'>

                    <Image.PreviewGroup>
                        {items.map((itemEle, index) => (
                            <ImageItem
                                key={index}
                                url={itemEle.content}
                                type='video'
                                onVisibleVideoModal={handleVisibleModal}
                            />
                        ))}
                    </Image.PreviewGroup>

                </div>
            </div>

            <ModalVideoCustom
                isVisible={visible}
                url={currentVideo}
                onClose={handleOnClose}
            />
        </div>
    );
}

export default ContentTabPaneMedia;
