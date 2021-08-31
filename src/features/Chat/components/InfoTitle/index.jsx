import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
InfoTitle.propTypes = {
    isGroup: PropTypes.bool,
};

InfoTitle.defaultProps = {
    isGroup: false,
}

function InfoTitle(props) {
    const { isGroup } = props;
    return (

        <div className="info_title">
            {
                isGroup
                    ? <span>Thông tin Nhóm</span>
                    : <span>Thông tin Hội thoại</span>
            }

        </div>
    );
}

export default InfoTitle;