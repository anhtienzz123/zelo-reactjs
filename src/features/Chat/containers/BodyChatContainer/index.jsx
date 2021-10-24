import { Spin } from 'antd';
import DividerCustom from 'features/Chat/components/DividerCustom';
import UserMessage from 'features/Chat/components/UserMessage';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPageMessage, setRaisePage } from '../../slice/chatSlice';
import './style.scss';

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
    const {
        messages,
        currentConversation,
        currentPage,
        totalPages,
        lastViewOfMember,
    } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.global);
    const [isSpinning, setIsSpinning] = useState(false);
    const scrollbars = useRef();
    const [position, setPosition] = useState(1);
    const dispatch = useDispatch();
    const previousHieight = useRef();
    const tempPosition = useRef();
    const indexMesssageBreak = useRef();
    useEffect(() => {
        if (turnOnScrollButoon) {
            scrollbars.current.scrollToBottom();
            onResetScrollButton(false);
        }
    }, [turnOnScrollButoon]);

    useEffect(() => {
        async function fetchNextListMessage() {
            if (currentPage > 0) {
                setIsSpinning(true);

                dispatch(
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
            if (position >= 0.95) {
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
                        conditionTime={true}
                    />
                );
                continue;
            }
            const dateTempt2 = new Date(currentMessage.createdAt);
            const dateTempt1 = new Date(preMessage.createdAt);

            const isSameUser =
                currentMessage.user._id === preMessage.user._id &&
                preMessage.type !== 'NOTIFY'
                    ? true
                    : false;

            const timeIsEqual =
                dateTempt2.setHours(dateTempt2.getHours() - 6) > dateTempt1
                    ? true
                    : false;

            // let conditionTime = false
            // if (isSameUser) {
            //     if (indexMesssageBreak.current === i) {
            //         conditionTime = true;
            //     }

            //     if (i === messages.length - 1) {
            //         conditionTime = true;
            //     }
            //     indexMesssageBreak.current = i
            // } else {
            //     if (indexMesssageBreak.current === i) {
            //         conditionTime = true;
            //     }

            //     if (i === messages.length - 1) {
            //         conditionTime = true;
            //     }

            // }

            // tin nhắn cuối
            const viewUsers = [];
            if (i == messages.length - 1) {
                const lastViewNotMe = lastViewOfMember.filter((ele) => {
                    if (
                        ele.user._id == messages[i].user._id ||
                        ele.user._id == user._id
                    )
                        return false;

                    return true;
                });

                lastViewNotMe.forEach((ele) => {
                    const { lastView, user } = ele;

                    if (new Date(lastView) >= new Date(messages[i].createdAt))
                        viewUsers.push(user);
                });
            }

            if (timeIsEqual) {
                result.push(
                    <div key={i}>
                        <DividerCustom dateString={dateTempt2} />
                        <UserMessage
                            key={i}
                            message={currentMessage}
                            isMyMessage={isMyMessage}
                            isVisibleTime={true}
                            viewUsers={viewUsers}
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
                        isVisibleTime={true}
                        viewUsers={viewUsers}
                    />
                );
        }

        return result;
    };

    const handleOnScrolling = ({ scrollTop, scrollHeight, top }) => {
        tempPosition.current = top;
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
        if (scrollId) {
            scrollbars.current.scrollToBottom();
        }
    }, [scrollId]);

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    useEffect(() => {
        if (messages.length > 0) {
            sleep(500).then(() => {
                scrollbars.current.scrollToBottom();
            });
        }
    }, [currentConversation]);

    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            ref={scrollbars}
            onScrollFrame={handleOnScrolling}
            onScrollStop={handleOnStop}
        >
            {/* <div className='main-body-conversation'> */}

            <div className="spinning-custom">
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
