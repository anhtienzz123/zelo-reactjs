import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Scrollbars from 'react-custom-scrollbars';
import FriendItem from '../FriendItem';
import { useSelector } from 'react-redux';
ListFriend.propTypes = {

};

function ListFriend(props) {
    const { friends } = useSelector(state => state.friend)
    return (

        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{ 'height': '100%', 'width': '100%' }}

        >

            {
                friends.length > 0 &&
                friends.map((ele, index) => (
                    <FriendItem
                        key={index}
                        data={ele}
                    />
                ))
            }



        </Scrollbars>

    );
}

export default ListFriend;