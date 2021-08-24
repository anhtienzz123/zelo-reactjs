import React from 'react';
import PropTypes from 'prop-types';

HeaderOptional.propTypes = {
    group: PropTypes.bool,
};

HeaderOptional.defaultProps = {
    group: false,
};

function HeaderOptional(props) {
    const { group } = props;
    return (
        <div>
            HeaderOptional
        </div>
    );
}

export default HeaderOptional;