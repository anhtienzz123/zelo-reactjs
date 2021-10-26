import { LikeTwoTone, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import messageApi from 'api/messageApi';
import NavigationChatBox from 'features/Chat/components/NavigationChatBox';
import TextEditor from 'features/Chat/components/TextEditor';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
FooterChatContainer.propTypes = {
    onScrollWhenSentText: PropTypes.func,
    socket: PropTypes.object,
};

FooterChatContainer.defaultProps = {
    onScrollWhenSentText: null,
    socket: null
};

const style_EditorText = {
    flexDirection: 'column',
};

const style_addtion_interaction = {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
};

function FooterChatContainer({ onScrollWhenSentText, socket }) {
    const [showTextFormat, setShowTextFormat] = useState(false);
    const { currentConversation, conversations } = useSelector(
        (state) => state.chat
    );
    const [isShowLike, setShowLike] = useState(true);
    const { TextArea } = Input;
    const [valueText, setValueText] = useState('');
    const [isHightLight, setHightLight] = useState(false);
    const { user } = useSelector((state) => state.global);
    const [detailConver, setDetailConver] = useState({});

    useEffect(() => {
        if (currentConversation) {
            const tempConver = conversations.find(
                (conver) => conver._id === currentConversation
            );
            if (tempConver) {
                setDetailConver(tempConver);
            }
        }

    }, [currentConversation])




    const handleClickTextFormat = () => {
        setShowTextFormat(!showTextFormat);
        setValueText('');
    };

    async function sendMessage(value, type) {
        const newMessage = {
            content: value,
            type: type,
            conversationId: currentConversation,
        };

        await messageApi
            .sendTextMessage(newMessage)
            .then((res) => {
                const { _id } = res;
                console.log('Send Message Success');
                if (onScrollWhenSentText) {
                    onScrollWhenSentText(_id);
                }
            })
            .catch((err) => console.log('Send Message Fail'));
    }

    const handleSentMessage = () => {
        if (showTextFormat) {
            sendMessage(valueText, 'HTML');
        } else {
            sendMessage(valueText, 'TEXT');
        }
        setValueText('');
        socket.emit('not-typing', currentConversation, user);
    };

    const handleOnChageInput = (e) => {
        const value = e.target.value;
        value.length > 0 ? setShowLike(false) : setShowLike(true);
        setValueText(value);


        if (value.length > 0) {
            console.log(socket);
            console.log(currentConversation);
            socket.emit('typing', currentConversation, user);
        } else {
            socket.emit('not-typing', currentConversation, user);
        }
    };

    const handleShowLike = (value) => {
        setShowLike(value);
    };

    const handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            if (!event.shiftKey) {
                const valueInput = event.target.value;

                if (valueInput.trim().length > 0) {
                    sendMessage(valueInput, 'TEXT');
                    setValueText('');
                    socket.emit('not-typing', currentConversation, user);

                }

                event.preventDefault();
            }
        }

    };

    const handleOnFocus = (e) => {
        socket.emit('conversation-last-view', currentConversation);
        setHightLight(true);
    };

    const handleOnBlur = (e) => {
        setHightLight(false);
        socket.emit('not-typing', currentConversation, user);
    };

    const handleSetValueEditor = (content) => {
        setValueText(content);
    };

    return (
        <div id='main-footer-chat'>
            <div className='navigation'>
                <NavigationChatBox
                    isFocus={isHightLight}
                    onClickTextFormat={handleClickTextFormat}
                />
            </div>

            <div
                className='chat-editor'
                style={showTextFormat ? style_EditorText : undefined}>
                <div className='main-editor'>
                    {showTextFormat ? (
                        <TextEditor
                            showFormat={showTextFormat}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            showLike={handleShowLike}
                            valueHtml={valueText}
                            onSetValue={handleSetValueEditor}
                        />
                    ) : (
                        <TextArea
                            autoSize={{ minRows: 1, maxRows: 5 }}
                            placeholder={`Nhập @, tin nhắt tới ${detailConver.name}`}
                            size='large'
                            // onPressEnter={handleMessageSend}
                            bordered={false}
                            onChange={handleOnChageInput}
                            onKeyDown={handleKeyPress}
                            value={valueText}
                            style={{ whiteSpace: 'pre-wrap' }}
                            spellCheck={false}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                        />
                    )}
                </div>

                <div
                    className='addtion-interaction'
                    style={
                        showTextFormat ? style_addtion_interaction : undefined
                    }>
                    <div className='emoji-or-stiker'>
                        <SmileOutlined />
                    </div>

                    <div className='like-emoji'>
                        {isShowLike ? (
                            <LikeTwoTone twoToneColor='#faad14' />
                        ) : (
                            <div
                                className='send-text-thumb'
                                onClick={handleSentMessage}>
                                <SendOutlined />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterChatContainer;
