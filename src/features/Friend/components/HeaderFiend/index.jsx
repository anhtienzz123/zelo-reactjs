import React from 'react';
import PropTypes from 'prop-types';
import ICON_FRIEND from 'assets/images/icon/icon_friend.png';
import ICON_GROUP from 'assets/images/icon/icon_group.png';
import ICON_CONTACT from 'assets/images/icon/contacts_icon.png';
import './style.scss';


HeaderFriend.propTypes = {
    subtab: PropTypes.number,
};

HeaderFriend.defaultProps = {
    subtab: 0,
};




function HeaderFriend({ subtab }) {


    return (
        <div id='header_friend'>
            <div className="header_friend__img">
                <img
                    src={subtab === 0 ? ICON_FRIEND : subtab === 1 ? ICON_GROUP : ICON_CONTACT}
                    alt="thumbnail"
                />
            </div>

            <div className="header_friend__text">
                {subtab === 0 ? "Danh sách kết bạn" : subtab === 1 ? "Danh sách nhóm" : 'Danh bạ'}
            </div>
        </div>
    );
}

export default HeaderFriend;