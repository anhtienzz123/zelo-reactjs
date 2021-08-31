import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import UserMessage from 'features/Chat/components/UserMessage';

BodyChatContainer.propTypes = {

};

function BodyChatContainer(props) {
    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
        >
            <div className="main-body-conversation">
 
                <UserMessage />
            </div>

        </Scrollbars>




    );
}

export default BodyChatContainer;