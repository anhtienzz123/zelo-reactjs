import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { LeftOutlined } from '@ant-design/icons';
InfoTitle.propTypes = {
    text: PropTypes.string,
    onBack: PropTypes.func,
    isBack: PropTypes.bool,
    isSelected: PropTypes.bool,
};

InfoTitle.defaultProps = {
    text: "",
    onBack: null,
    isBack: false,
    isSelected: false,
}

function InfoTitle(props) {
    const { text, onBack, isBack, isSelected } = props;

    const handleOnClick = () => {
        if (onBack) {
            onBack(0);
        }
    }

    const handleSelect = () => {

    }
    return (

        <div className="info_title">
            {isBack &&
                (
                    <div className="back-icon" onClick={handleOnClick}>
                        <LeftOutlined />
                    </div>
                )
            }

            <span>{text}</span>

            {isSelected &&
                (
                    <div className="select-text" onClick={handleSelect}>
                        <span>Chọn</span>
                    </div>
                )
            }

        </div>
    );
}

export default InfoTitle;