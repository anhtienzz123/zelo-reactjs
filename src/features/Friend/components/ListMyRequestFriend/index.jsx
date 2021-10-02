import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import FriendCard from '../FriendCard';
ListMyFriendRequest.propTypes = {

};

function ListMyFriendRequest(props) {
    return (
        <div className='list-my-friend-request'>


            <FriendCard
                isMyRequest={true}
            />
            <FriendCard
                isMyRequest={true}
            />
        </div>
    );
}

export default ListMyFriendRequest;