import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import UserMessage from 'features/Chat/components/UserMessage';
import { useDispatch, useSelector } from 'react-redux';
import DividerCustom from 'features/Chat/components/DividerCustom';
import { setRaisePage, fetchNextPageMessage } from '../../chatSlice';
import './style.scss';
import { Spin } from 'antd';

BodyChatContainer.propTypes = {
    scrollId: PropTypes.string,
    onSCrollDown: PropTypes.string,
    onBackToBottom: PropTypes.func,
};


BodyChatContainer.defaultProps = {
    scrollId: "",
    onSCrollDown: '',
    onBackToBottom: null,
};


const HOURS_MINUS = 6;

function BodyChatContainer({ scrollId, onSCrollDown, onBackToBottom, onResetScrollButton, turnOnScrollButoon }) {
    const { messages, currentConversation, currentPage } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.global);
    const [isSpinning, setIsSpinning] = useState(false);
    const scrollbars = useRef();
    const [position, setPosition] = useState(1);
    const dispatch = useDispatch();
    const previousHieight = useRef();
    const tempPosition = useRef();

    useEffect(() => {
        if (turnOnScrollButoon) {
            scrollbars.current.scrollToBottom();
            onResetScrollButton(false);
        }
    }, [turnOnScrollButoon])

    // useEffect(() => {
    //     scrollbars.current.view.scroll({
    //         top: 1000,
    //         left: 0,
    //         behavior: 'smooth'
    //     });
    // }, [])

    useEffect(() => {
        if (scrollId) {

            scrollbars.current.scrollToBottom();
        }
    }, [scrollId])

    useEffect(() => {
        scrollbars.current.scrollToBottom();
    }, [currentConversation])

    useEffect(() => {
        async function fetchNextListMessage() {
            if (currentPage > 0) {
                setIsSpinning(true);

                await dispatch(fetchNextPageMessage({
                    conversationId: currentConversation,
                    page: currentPage,
                    size: 10

                }));
                setIsSpinning(false);

                scrollbars.current.scrollTop(scrollbars.current.getScrollHeight() - previousHieight.current);

            }
        }

        fetchNextListMessage();

    }, [currentPage]);

    useEffect(() => {
        if (onSCrollDown) {
            if (position >= 0.99) {

                scrollbars.current.scrollToBottom();
            } else {
                if (onBackToBottom) {
                    onBackToBottom(true)
                }
            }
        }
    }, [onSCrollDown])

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




    const handleOnScrolling = ({ scrollTop, scrollHeight, top }) => {
        tempPosition.current = top;
        if (scrollTop === 0) {
            console.log("Previous scroll height", scrollHeight);
            previousHieight.current = scrollHeight;
            dispatch(setRaisePage());
        }

        if (top < 0.85) {
            if (onBackToBottom) {
                onBackToBottom(true);
            }
        } else {
            if (onBackToBottom) {
                onBackToBottom(false);
            }
        }
    }

    const handleOnStop = (value) => {
        setPosition(tempPosition.current);
    }


    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            ref={scrollbars}
            onScrollFrame={handleOnScrolling}
            onScrollStop={handleOnStop}
            style={{
                scrollBehavior: 'smooth'
            }}

        >
            {/* <div className='main-body-conversation'> */}


            <div className='spinning-custom'>
                <Spin spinning={isSpinning} />
            </div>
            {renderMessages(messages)}


            {/* </div>  */}


        </Scrollbars >
    );
}

export default BodyChatContainer;
