import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { Avatar, Badge } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
PersonalIcon.propTypes = {
    isActive: PropTypes.bool,
    demention: PropTypes.number,
    common: PropTypes.bool,
    isHost: PropTypes.bool,
};

PersonalIcon.defaultProps = {
    isActive: false,
    demention: 48,
    common: true,
    isHost: false,
}


function PersonalIcon(props) {
    const { isActive, demention, common, isHost } = props;

    return (
        <div
            className={
                (isActive && common)
                    ? "user-icon common"
                    : (!isActive && common)
                        ? "user-icon no-online common"
                        : (isActive && !common) ? 'user-icon'
                            : 'user-icon no-online'
            }

        >
            <Badge
                offset={!isHost ? [-5, 40] : [-5, 32]}
                color='green'
                count={isHost
                    ? <KeyOutlined style={{
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        padding: '0.24rem',
                        borderRadius: '50%',
                        color: 'yellow',
                        fontSize: '1.2rem'

                    }}
                    />
                    : ''}

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