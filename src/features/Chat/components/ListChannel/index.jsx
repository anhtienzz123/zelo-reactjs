import React from 'react';
import PropTypes from 'prop-types';
import ChannelItem from '../ChannelItem';

ListChannel.propTypes = {

};

function ListChannel(props) {
    return (
        <div id='list-channel'>
            <ChannelItem />
        </div>
    );
}

export default ListChannel;