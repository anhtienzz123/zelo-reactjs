import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

ConversationContainer.propTypes = {

};

function ConversationContainer(props) {
    return (

        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
        >
            <div id='conversation-main'>
                Conversation
            </div>
        </Scrollbars>


    );
}

export default ConversationContainer;