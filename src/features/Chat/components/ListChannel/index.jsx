import React from 'react';
import PropTypes from 'prop-types';
import ChannelItem from '../ChannelItem';
import { useSelector } from 'react-redux';

ListChannel.propTypes = {
    data: PropTypes.array,
};


ListChannel.defaultProps = {
    data: [],
};


function ListChannel({ data }) {
    const { currentChannel } = useSelector(state => state.chat);

    return (
        <div id='list-channel'>

            {data.map((ele, index) => (
                <ChannelItem
                    data={ele}
                    isActive={currentChannel === ele._id ? true : false}
                />
            ))}

        </div>
    );
}

export default ListChannel;