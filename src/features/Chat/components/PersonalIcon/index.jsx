import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { Avatar, Badge } from 'antd';
PersonalIcon.propTypes = {
    isActive: PropTypes.bool,
    demention: PropTypes.number,
};

PersonalIcon.defaultProps = {
    isActive: false,
    demention: 48,
}


function PersonalIcon(props) {
    const { isActive, demention } = props;
    return (
        <div className={isActive ? "user-icon" : "user-icon no-online"}>
            <Badge
                offset={[-5, 40]}
                color='green'

            >
                <Avatar
                    size={demention}
                    src="https://i.pinimg.com/474x/4b/2e/c4/4b2ec461dc3a039b1f6d18318fc391b2.jpg"
                />
            </Badge>
        </div >
    );
}

export default PersonalIcon;