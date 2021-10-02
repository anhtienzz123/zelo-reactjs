import React from 'react';
import PropTypes from 'prop-types';
import FriendCard from '../FriendCard';

ListFriendCard.propTypes = {

};

function ListFriendCard(props) {
    return (
        <div id='list-friend-card'>
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />
            <FriendCard />

        </div>
    );
}

export default ListFriendCard;