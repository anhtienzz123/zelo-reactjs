import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Avatar, Badge } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
PersonalIcon.propTypes = {
    avatar: PropTypes.string,
    isActive: PropTypes.bool,
    demention: PropTypes.number,
    common: PropTypes.bool,
    isHost: PropTypes.bool,
};

PersonalIcon.defaultProps = {
    avatar: '',
    isActive: false,
    demention: 48,
    common: true,
    isHost: false,
};

function PersonalIcon(props) {
    const { avatar, isActive, demention, common, isHost } = props;

    return (
        <div
            className={
                isActive && common
                    ? 'user-icon common'
                    : !isActive && common
                    ? 'user-icon no-online common'
                    : isActive && !common
                    ? 'user-icon'
                    : 'user-icon no-online'
            }>
            <Badge
                offset={!isHost ? [-5, 40] : [-5, 32]}
                color='green'
                count={
                    isHost ? (
                        <KeyOutlined
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                padding: '0.24rem',
                                borderRadius: '50%',
                                color: 'yellow',
                                fontSize: '1.2rem',
                            }}
                        />
                    ) : (
                        ''
                    )
                }>
                <Avatar size={demention} src={avatar} />
            </Badge>
        </div>
    );
}

export default PersonalIcon;
