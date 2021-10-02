import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Scrollbars from 'react-custom-scrollbars';
import FriendItem from '../FriendItem';
ListFriend.propTypes = {

};

function ListFriend(props) {
    return (

        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{ 'height': '100%', 'width': '100%' }}

        >

            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />
            <FriendItem />

        </Scrollbars>

    );
}

export default ListFriend;