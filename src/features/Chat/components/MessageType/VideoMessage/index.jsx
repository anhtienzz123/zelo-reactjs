import React from 'react';
import PropTypes from 'prop-types';
import MESSAGE_STYLE from 'constants/MessageStyle/messageStyle';
VideoMessage.propTypes = {
    content: PropTypes.string,
    dateAt: PropTypes.object,
};

VideoMessage.defaultProps = {
    content: '',
    dateAt: null
};

function VideoMessage({ content, children, dateAt }) {
    return (
        <>
            <div className="message-video-wrapper">
                <div className="message-video-main">
                    <video
                        controls
                        style={MESSAGE_STYLE.videoStyle}
                    >
                        <source
                            src={content}
                            type="video/mp4"
                        />
                    </video>
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

export default VideoMessage;