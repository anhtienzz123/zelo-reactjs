import React from 'react';
import PropTypes from 'prop-types';
import FriendCard from '../FriendCard';

ListRequestFriend.propTypes = {

};

function ListRequestFriend(props) {
    return (
        <div id='list-friend-card'>
            <FriendCard />
            <FriendCard />


        </div>
    );
}

export default ListRequestFriend;