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
    scrollId: '',
    onSCrollDown: '',
    onBackToBottom: null,
};

const HOURS_MINUS = 6;

function BodyChatContainer({
    scrollId,
    onSCrollDown,
    onBackToBottom,
    onResetScrollButton,
    turnOnScrollButoon,
}) {
    const { messages, currentConversation, currentPage } = useSelector(
        (state) => state.chat
    );
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
    }, [turnOnScrollButoon]);

    useEffect(() => {
        if (scrollId) {
            scrollbars.current.scrollToBottom();
        }
    }, [scrollId]);

    useEffect(() => {
        async function fetchNextListMessage() {
            if (currentPage > 0) {
                setIsSpinning(true);

                await dispatch(
                    fetchNextPageMessage({
                        conversationId: currentConversation,
                        page: currentPage,
                        size: 10,
                    })
                );
                setIsSpinning(false);

                scrollbars.current.scrollTop(
                    scrollbars.current.getScrollHeight() -
                        previousHieight.current
                );
            }
        }

        fetchNextListMessage();
    }, [currentPage]);

    useEffect(() => {
        if (
            onSCrollDown &&
            scrollbars.current.getScrollHeight() >
                scrollbars.current.getClientHeight()
        ) {
            if (position >= 0.99) {
                scrollbars.current.scrollToBottom();
            } else {
                if (onBackToBottom) {
                    onBackToBottom(true, 'Có tin nhắn mới');
                }
            }
        }
    }, [onSCrollDown]);

    const renderMessages = (messages) => {
        const result = [];

        for (let i = 0; i < messages.length; i++) {
            const preMessage = messages[i - 1];
            const currentMessage = messages[i];

            const senderId = currentMessage.user._id;
            const isMyMessage = senderId === user._id ? true : false;

            // chổ này có thể sai
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

            const isSameUser =
                currentMessage.user._id === preMessage.user._id &&
                preMessage.type !== 'NOTIFY'
                    ? true
                    : false;

            // Check tin nhắn sau có cùng người gửi vs tin nhắn trước

            const dateTempt1 = new Date(preMessage.createdAt);
            const dateTempt2 = new Date(currentMessage.createdAt);

            if (
                // chổ này đang so sánh 5 phút nên để lại 6hours
                dateTempt2.setHours(dateTempt2.getHours() - 6) > dateTempt1
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
                        isSameUser={isSameUser}
                    />
                );
        }

        return result;
    };

    const handleOnScrolling = ({ scrollTop, scrollHeight, top }) => {
        tempPosition.current = top;

        console.log('CHay scroll');
        if (
            scrollbars.current.getScrollHeight() ===
            scrollbars.current.getClientHeight()
        ) {
            onBackToBottom(false);
            return;
        }

        if (scrollTop === 0) {
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
    };

    const handleOnStop = (value) => {
        setPosition(tempPosition.current);
    };

    useEffect(() => {
        scrollbars.current.scrollToBottom();
        console.log(
            scrollbars.current.getScrollHeight(),
            ':',
            scrollbars.current.getClientHeight()
        );
    }, [currentConversation]);

    const handleOnScroll = (e) => {};

    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            ref={scrollbars}
            onScrollFrame={handleOnScrolling}
            onScrollStop={handleOnStop}>
            {/* <div className='main-body-conversation'> */}

            <div className='spinning-custom'>
                <Spin spinning={isSpinning} />
            </div>

            {renderMessages(messages)}

            {/* <button onClick={() => {
                document.getElementById('613dddc02f1e724484d09d82').scrollIntoView();
            }}>
                nust test
            </button> */}

            {/* </div>  */}
        </Scrollbars>
    );
}

export default BodyChatContainer;
