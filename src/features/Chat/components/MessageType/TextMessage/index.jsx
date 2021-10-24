import React from 'react';
import PropTypes from 'prop-types';

TextMessage.propTypes = {
    content: PropTypes.string,
    dateAt: PropTypes.object,
    isVisibleTime: PropTypes.bool.isRequired,
    isSeen: PropTypes.bool,
};

TextMessage.defaultProps = {
    dateAt: null,
    isSeen: false

}

function TextMessage({ content, children, dateAt, isSeen }) {
    return (
        <div>
            {content}


            <div className="time-and-last_view">

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

                {
                    isSeen && (
                        <div className="is-seen-message">
                            Đã xem
                        </div>
                    )

                }
            </div>

            {children}




        </div>


    );
}

export default TextMessage;