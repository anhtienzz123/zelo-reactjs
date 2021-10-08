import React from 'react';
import PropTypes from 'prop-types';
import ImageItem from '../ImageItem';
import './style.scss';
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
                {/* <div className='time-sent'>
                    <span>Ngày 20 tháng 10</span>
                </div> */}

                <div className='list-item-sent'>
                    {items.map((itemEle, index) => (
                        <ImageItem key={index} url={itemEle.content} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ContentTabPaneMedia;
