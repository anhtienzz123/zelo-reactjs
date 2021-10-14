import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'antd';
import { fallback } from 'assets/images/fallbackImage'
import MESSAGE_STYLE from 'constants/MessageStyle/messageStyle';
ImageMessage.propTypes = {
    content: PropTypes.string,
    dateAt: PropTypes.object,
};

ImageMessage.defaultProps = {
    content: '',
    dateAt: null
};

function ImageMessage({ content, children, dateAt }) {
    return (
        <>
            <div className="messsage-image-wrapper">
                <div className="message-image--main">
                    <Image
                        src={content}
                        fallback={fallback}
                        style={MESSAGE_STYLE.imageStyle}
                    />
                </div>

                {children}

            </div>

            <div className="time-send">
                <span>
                    {`0${dateAt.getHours()}`.slice(
                        -2
                    )}
                    :
                    {`0${dateAt.getMinutes()}`.slice(
                        -2
                    )}
                </span>
            </div>
        </>
    );
}

export default ImageMessage;