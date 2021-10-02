import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {
    SmileOutlined,
    FileImageOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import { IoText } from "react-icons/io5";
import { Button } from 'antd';
import UploadFile from 'customfield/upLoadFile';

NavigationChatBox.propTypes = {
    onClickTextFormat: PropTypes.func,
    isFocus: PropTypes.bool,
};

NavigationChatBox.defaultProps = {
    onClickTextFormat: null,
    isFocus: false,
};

const styleBorder = {
    borderColor: '#396edd'
}

const styleButton = {
    background: 'none',
    outline: 'none',
    border: 'red',
    padding: '0px',
    borderRadius: '50%',
    fontSize: '2.2rem',
}




function NavigationChatBox(props) {
    const { onClickTextFormat, isFocus } = props;

    const handleOnClickTextFormat = () => {

        if (onClickTextFormat) {
            onClickTextFormat();
        }
    }
    return (
        <div
            style={isFocus ? styleBorder : undefined}
            id='navigation-chat-box'
        >
            <ul>
                <li className='item-chat-box'>
                    <div title='Gửi sticker'>
                        <SmileOutlined />
                    </div>
                </li>

                <li className='item-chat-box'>

                    <UploadFile
                        type='Image'

                    >
                        <Button
                            title='Gửi hình ảnh'
                            type="text"
                            style={styleButton}
                        >
                            <FileImageOutlined />
                        </Button>
                    </UploadFile>

                </li>


                <li className='item-chat-box'>
                    <UploadFile
                        type='File'

                    >
                        <Button
                            title='Gửi file'
                            type="text"
                            style={styleButton}
                        >
                            <LinkOutlined />
                        </Button>
                    </UploadFile>




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