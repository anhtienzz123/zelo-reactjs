import React from 'react';
import PropTypes from 'prop-types';

TextMessage.propTypes = {
    content: PropTypes.string,
    dateAt: PropTypes.object,
    isVisibleTime: PropTypes.bool.isRequired,
};

TextMessage.defaultProps = {
    dateAt: null,

}

function TextMessage({ content, children, dateAt, isVisibleTime }) {
    return (
        <div>
            {content}
            {children}


            {
                isVisibleTime &&
                (
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
                )
            }
        </div>


    );
}

export default TextMessage;