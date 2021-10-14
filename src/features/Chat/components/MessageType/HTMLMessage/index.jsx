import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser'
HTMLMessage.propTypes = {
    content: PropTypes.string.isRequired,
};

function HTMLMessage({ content, children }) {
    return (
        <div>
            {parse(content)}
            {children}
        </div>
    );
}

export default HTMLMessage;