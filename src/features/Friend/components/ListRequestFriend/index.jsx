import React from 'react';
import PropTypes from 'prop-types';
import FriendCard from '../FriendCard';
import { useDispatch } from 'react-redux';
import friendApi from 'api/friendApi';
import { fetchFriends, fetchListRequestFriend } from 'features/Friend/friendSlice';
import { fetchListFriends } from 'features/Chat/chatSlice';

ListRequestFriend.propTypes = {
    data: PropTypes.array,
};

ListRequestFriend.defaultProps = {
    data: [],
};


function ListRequestFriend({ data }) {
    const dispatch = useDispatch();




    const handeDenyRequest = async (value) => {
        await friendApi.deleteRequestFriend(value._id);
        dispatch(fetchListRequestFriend());

    }

    const handleOnAccept = async (value) => {
        await friendApi.acceptRequestFriend(value._id);
        dispatch(fetchListRequestFriend());
        dispatch(fetchFriends({ name: '' }));
        dispatch(fetchListFriends({ name: '' }))
    }





    return (
        <div id='list-friend-card'>
            {(data && data.length > 0) &&
                data.map((ele, index) => (
                    <FriendCard
                        key={index}
                        data={ele}
                        onDeny={handeDenyRequest}
                        onAccept={handleOnAccept}
                    />

                ))
            }
        </div>
    );
}

export default ListRequestFriend;