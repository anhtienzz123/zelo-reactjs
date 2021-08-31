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

};

function NavigationChatBox(props) {
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
                    <div title='Định dạng tin nhắn'>
                        <IoText />
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default NavigationChatBox;