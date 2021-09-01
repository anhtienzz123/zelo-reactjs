import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {
    SmileOutlined,
    FileImageOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import { IoText } from "react-icons/io5";

NavigationChatBox.propTypes = {
    onClickTextFormat: PropTypes.func,
};

NavigationChatBox.defaultProps = {
    onClickTextFormat: null,
};


function NavigationChatBox(props) {
    const { onClickTextFormat } = props;

    const handleOnClickTextFormat = () => {

        if (onClickTextFormat) {
            onClickTextFormat();
        }
    }
    return (
        <div id='navigation-chat-box'>
            <ul>
                <li className='item-chat-box'>
                    <div title='Gửi sticker'>
                        <SmileOutlined />
                    </div>
                </li>

                <li className='item-chat-box'>
                    <div title='Gửi hình ảnh'>
                        <FileImageOutlined />
                    </div>
                </li>


                <li className='item-chat-box'>
                    <div title='Gửi file'>
                        <LinkOutlined />
                    </div>
                </li>

                <li className='item-chat-box'>
                    <div title='Định dạng tin nhắn' onClick={handleOnClickTextFormat}>
                        <IoText />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default NavigationChatBox;