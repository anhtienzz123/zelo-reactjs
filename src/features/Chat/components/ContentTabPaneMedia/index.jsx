import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../ImageItem';
import './style.scss';
import { Image } from 'antd';
ContentTabPaneMedia.propTypes = {
    items: PropTypes.array,
};

ContentTabPaneMedia.defaultProps = {
    items: [],
};

function ContentTabPaneMedia(props) {
    const { items } = props;
    return (
        <div id='content-tabpane-media-wrapper'>
            <div className='item-in-archive-media'>
                <div className='list-item-sent'>

                    <Image.PreviewGroup>
                        {items.map((itemEle, index) => (
                            <ImageItem key={index} url={itemEle.content} />
                        ))}
                    </Image.PreviewGroup>

                </div>
            </div>
        </div>
    );
}

export default ContentTabPaneMedia;
