import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NavigationChatBox from 'features/Chat/components/NavigationChatBox';
import {
    LikeFilled,
    LikeOutlined,
    LikeTwoTone,
    SendOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import './style.scss';
import TextEditor from 'features/Chat/components/TextEditor';
import { Input } from 'antd';
import messageApi from 'api/messageApi';
import { useSelector } from 'react-redux';
FooterChatContainer.propTypes = {};

const style_EditorText = {
    flexDirection: 'column',
};

const style_addtion_interaction = {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
};

function FooterChatContainer(props) {
    const [showTextFormat, setShowTextFormat] = useState(false);
    const { currentConversation, conversations } = useSelector((state) => state.chat);
    const [isShowLike, setShowLike] = useState(true);
    const { TextArea } = Input;
    const [valueText, setValueText] = useState('');
    const [isHightLight, setHightLight] = useState(false);



    const detailConver = conversations.find(conver => conver._id === currentConversation);

    const handleClickTextFormat = () => {
        setShowTextFormat(!showTextFormat);
    };

    function sendMessage(value, type) {
        const newMessage = {
            content: value,
            type: type,
            conversationId: currentConversation,
        };

        messageApi
            .sendTextMessage(newMessage)
            .then((res) => console.log('Send Message Success'))
            .catch((err) => console.log('Send Message Fail'));

    };

    const handleSentMessage = () => {
        sendMessage(valueText, 'TEXT');
    }

    const handleOnChageInput = (e) => {
        const value = e.target.value;
        value.length > 0 ? setShowLike(false) : setShowLike(true);
        setValueText(value);
    }

    const handleKeyPress = (event) => {
        console.log("keycode", event.keyCode);
        if (event.keyCode === 13) {

            if (!event.shiftKey) {
                const valueInput = event.target.value;
                setValueText('');
                sendMessage(valueInput, 'TEXT');
                event.preventDefault();

            }
        }


    }

    const handleOnFocus = (e) => {
        setHightLight(true)
    }


    const handleOnBlur = (e) => {
        setHightLight(false)
    }

    return (
        <div id='main-footer-chat'>
            <div className='navigation'>
                <NavigationChatBox isFocus={isHightLight} onClickTextFormat={handleClickTextFormat} />
            </div>

            <div
                className='chat-editor'
                style={showTextFormat ? style_EditorText : undefined}>
                <div className='main-editor'>

                    {
                        showTextFormat
                            ? (<TextEditor showFormat={showTextFormat} />)
                            : (<TextArea
                                autoSize={{ minRows: 1, maxRows: 5 }}
                                placeholder={`Nhập @, tin nhắt tới ${detailConver.name}`}
                                size='large'
                                // onPressEnter={handleMessageSend}
                                bordered={false}
                                onChange={handleOnChageInput}
                                onKeyDown={handleKeyPress}
                                value={valueText}
                                style={{ whiteSpace: "pre-wrap" }}
                                spellCheck={false}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}

                            />)
                    }

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
                        {
                            isShowLike
                                ? <LikeTwoTone twoToneColor='#faad14' />
                                : <div className='send-text-thumb' onClick={handleSentMessage}>
                                    <SendOutlined />
                                </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterChatContainer;
