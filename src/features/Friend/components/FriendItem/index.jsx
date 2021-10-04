import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { DashOutlined } from '@ant-design/icons';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
FriendItem.propTypes = {
    data: PropTypes.object.isRequired,
};

FriendItem.defaultProps = {

};

function FriendItem({ data }) {
    return (
        <div id='friend-item'>
            <div className="friend-item_left">
                <div className="friend-item-avatar">
                    <PersonalIcon
                        isActive={true}
                        avatar={data.avatar}
                    />
                </div>

                <div className="friend-item-name">
                    {data.name}
                </div>
            </div>
            <div className="friend-item_right">
                <div className="friend-item-interact">
                    <DashOutlined />
                </div>
            </div>
        </div>
    );
}

export default FriendItem;