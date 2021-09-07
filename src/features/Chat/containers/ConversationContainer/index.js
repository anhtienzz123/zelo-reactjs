import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';
import { Avatar, Divider, Tooltip } from 'antd';
import './style.scss';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import ConversationSingle from 'features/Chat/components/ConversationSingle';
import ConversationMutiple from 'features/Chat/components/ConversationMutiple';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchListConversations,
    fetchListMessages,
} from 'features/Chat/chatSlice';
ConversationContainer.propTypes = {};

const styleGroup3 = {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)',
};

const styleGroup2 = {
    display: 'flex',
    alignItems: 'center',
};
function ConversationContainer(props) {
    const dispatch = useDispatch();
    const { conversations } = useSelector((state) => state.chat);

    const handleConversationClick = (conversationId) => {
        dispatch(fetchListMessages({ conversationId }));
    };

    useEffect(() => {
        dispatch(fetchListConversations({}));
    }, []);

    return (
        <>
            <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                autoHideDuration={200}>
                <div id='conversation-main'>
                    <ul className='list_conversation' >
                        {conversations.map((conversationEle, index) => {
                            const { numberUnread } = conversationEle;

                            return (

                                <li
                                    key={index}
                                    className={`conversation-item ${numberUnread === 0
                                        ? ''
                                        : 'arrived-message'
                                        } `}>
                                    <ConversationSingle
                                        conversation={conversationEle}
                                        onClick={handleConversationClick}
                                    />
                                </li>

                            );
                        })}
                    </ul>
                </div>
            </Scrollbars>
        </>
    );
}

export default ConversationContainer;
