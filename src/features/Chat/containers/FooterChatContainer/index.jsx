import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NavigationChatBox from 'features/Chat/components/NavigationChatBox';
import {
    LikeFilled,
    LikeOutlined,
    LikeTwoTone,
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
    const { currentConversation } = useSelector((state) => state.chat);

    const handleClickTextFormat = () => {
        setShowTextFormat(!showTextFormat);
    };

    const handleMessageSend = (e) => {
        const inputValue = e.target.value;

        const newMessage = {
            content: inputValue,
            type: 'TEXT',
            conversationId: currentConversation,
        };

        messageApi
            .sendTextMessage(newMessage)
            .then((res) => console.log('Send Message Success'))
            .catch((err) => console.log('Send Message Fail'));
    };

    return (
        <div id='main-footer-chat'>
            <div className='navigation'>
                <NavigationChatBox onClickTextFormat={handleClickTextFormat} />
            </div>

            <div
                className='chat-editor'
                style={showTextFormat ? style_EditorText : undefined}>
                <div className='main-editor'>
                    {/* <TextEditor showTextFormat={showTextFormat} /> */}
                    <Input
                        placeholder='Nhập'
                        size='large'
                        onPressEnter={handleMessageSend}
                    />
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
                        <LikeTwoTone twoToneColor='#faad14' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FooterChatContainer;
