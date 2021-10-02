import React from 'react';
import PropTypes from 'prop-types';
import ICON_FRIEND from 'assets/images/icon/icon_friend.png';
import ICON_GROUP from 'assets/images/icon/icon_group.png';
import './style.scss';


HeaderFriend.propTypes = {
    type: PropTypes.number,
};

HeaderFriend.defaultProps = {
    type: 0,
};




function HeaderFriend({ type }) {

    return (
        <div id='header_friend'>
            <div className="header_friend__img">
                <img
                    src={type ? ICON_GROUP : ICON_FRIEND}
                    alt="thumbnail"
                />
            </div>

            <div className="header_friend__text">
                {type ? 'Danh sách nhóm' : 'Danh sách kết bạn'}
            </div>
        </div>
    );
}

export default HeaderFriend;