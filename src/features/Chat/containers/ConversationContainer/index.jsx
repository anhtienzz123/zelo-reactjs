import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Avatar, Divider, Tooltip } from 'antd';
import './style.scss';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import ConversationSingle from 'features/Chat/components/ConversationSingle';
import ConversationMutiple from 'features/Chat/components/ConversationMutiple';
ConversationContainer.propTypes = {

};


const styleGroup3 = {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)'
}

const styleGroup2 = {
    display: 'flex',
    alignItems: 'center',
}
function ConversationContainer(props) {
    return (
        <>
            <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                autoHideDuration={200}


            >
                <div id='conversation-main'>



                    <ul className="list_conversation">

                        <li className="conversation-item arrived-message">
                            <ConversationMutiple participants={4} />
                        </li>

                        <li className="conversation-item ">
                            <ConversationMutiple participants={3} />
                        </li>

                        <li className="conversation-item ">
                            <ConversationMutiple participants={2} />
                        </li>

                        <li className="conversation-item ">
                            <ConversationMutiple participants={1} />
                        </li>

                        <li className="conversation-item ">
                            <ConversationSingle />
                        </li>

                        <li className="conversation-item arrived-message">
                            <ConversationSingle />
                        </li>

                        <li className="conversation-item ">
                            <ConversationMutiple participants={1} />
                        </li>

                        <li className="conversation-item ">
                            <ConversationSingle />
                        </li>

                        <li className="conversation-item arrived-message">
                            <ConversationSingle />
                        </li>

                        <li className="conversation-item ">
                            <ConversationMutiple participants={1} />
                        </li>

                        <li className="conversation-item ">
                            <ConversationSingle />
                        </li>

                        <li className="conversation-item arrived-message">
                            <ConversationSingle />
                        </li>



                    </ul>
                </div>
            </Scrollbars>
        </>

    );
}

export default ConversationContainer;