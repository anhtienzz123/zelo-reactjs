import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import UserMessage from 'features/Chat/components/UserMessage';
import { useDispatch, useSelector } from 'react-redux';
import DividerCustom from 'features/Chat/components/DividerCustom';
import { setRaisePage, fetchNextPageMessage } from '../../chatSlice';
import './style.scss';
import { Spin } from 'antd';

BodyChatContainer.propTypes = {};

const HOURS_MINUS = 6;

function BodyChatContainer(props) {
    const { messages, currentConversation, currentPage } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.global);
    const [isSpinning, setIsSpinning] = useState(false);
    const scrollbars = useRef();
    const dispatch = useDispatch();
    const previousHieight = useRef();


    useEffect(() => {
        scrollbars.current.scrollToBottom();
    }, [currentConversation])

    useEffect(() => {
        async function fetchNextListMessage() {
            if (currentPage > 0) {

                await dispatch(fetchNextPageMessage({
                    conversationId: currentConversation,
                    page: currentPage,
                    size: 5

                }));

                console.log("Current scroll height", scrollbars.current.getScrollHeight());
                scrollbars.current.scrollTop(scrollbars.current.getScrollHeight() - previousHieight.current);

            }
        }

        fetchNextListMessage();

    }, [currentPage]);

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




    const handleOnScrolling = ({ scrollTop, scrollHeight }) => {



        if (scrollTop === 0) {
            console.log("Previous scroll height", scrollHeight);
            previousHieight.current = scrollHeight;
            dispatch(setRaisePage());
        }
    }


    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            ref={scrollbars}
            onScrollFrame={handleOnScrolling}
        >
            <div className='main-body-conversation'>


                <div>
                    <Spin spinning={isSpinning} />
                </div>
                {renderMessages(messages)}

                {/* <button onClick={handleOnClick}>
                    abcd
                </button> */}


            </div>


        </Scrollbars>
    );
}

export default BodyChatContainer;
