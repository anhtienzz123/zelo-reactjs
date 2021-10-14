import React from 'react';
import PropTypes from 'prop-types';

TextMessage.propTypes = {
    content: PropTypes.string,
};

function TextMessage({ content, children }) {
    return (
        <div>
            {content}
            {children}
        </div>
    );
}

export default TextMessage;