import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { DashOutlined } from '@ant-design/icons';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
FriendItem.propTypes = {

};

function FriendItem(props) {
    return (
        <div id='friend-item'>
            <div className="friend-item_left">
                <div className="friend-item-avatar">
                    <PersonalIcon
                        isActive={true}
                        avatar='https://gamek.mediacdn.vn/133514250583805952/2020/11/7/photo-1-16047368104351907433833.jpg'
                    />
                </div>

                <div className="friend-item-name">
                    Mean Nghi
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