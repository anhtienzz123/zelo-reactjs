import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import UserMessage from 'features/Chat/components/UserMessage';
import { useSelector } from 'react-redux';
import DividerCustom from 'features/Chat/components/DividerCustom';
import './style.scss';

BodyChatContainer.propTypes = {};

const HOURS_MINUS = 6;

function BodyChatContainer(props) {
    const { messages } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.global);

    const renderMessages = (messages) => {
        const result = [];

        for (let i = 0; i < messages.length; i++) {
            const preMessage = messages[i - 1];
            const currentMessage = messages[i];

            const senderId = currentMessage.user._id;
            const isMyMessage = senderId === user._id ? true : false;

            if (i === 0) {
                result.push(
                    <UserMessage
                        key={i}
                        message={currentMessage}
                        isMyMessage={isMyMessage}
                    />
                );
                continue;
            }

            const dateTempt1 = new Date(preMessage.createdAt);
            const dateTempt2 = new Date(currentMessage.createdAt);

            //   dateTempt2.setHours(dateTempt2.getHours() - HOURS_MINUS)

            if (
                dateTempt2.setMinutes(dateTempt2.getMinutes() - 5) > dateTempt1
            ) {
                result.push(
                    <div key={i}>
                        <DividerCustom dateString={dateTempt2} />
                        <UserMessage
                            key={i}
                            message={currentMessage}
                            isMyMessage={isMyMessage}
                        />
                    </div>
                );
            } else
                result.push(
                    <UserMessage
                        key={i}
                        message={currentMessage}
                        isMyMessage={isMyMessage}
                    />
                );
        }

        return result;
    };

    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}>
            <div className='main-body-conversation'>
                {renderMessages(messages)}
            </div>
        </Scrollbars>
    );
}

export default BodyChatContainer;
