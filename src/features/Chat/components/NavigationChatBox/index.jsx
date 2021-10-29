import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {
    SmileOutlined,
    FileImageOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import { IoText } from "react-icons/io5";
import { Button, Popover } from 'antd';
import UploadFile from 'customfield/upLoadFile';
import Sticker from '../Sticker';
import { useSelector } from 'react-redux';

NavigationChatBox.propTypes = {
    onClickTextFormat: PropTypes.func,
    isFocus: PropTypes.bool,
    onScroll: PropTypes.func,
};

NavigationChatBox.defaultProps = {
    onClickTextFormat: null,
    isFocus: false,
    onScroll: null
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
    const { onClickTextFormat, isFocus, onScroll } = props;
    const [visiblePop, setVisiblePop] = useState(false);
    const { stickers } = useSelector(state => state.chat)

    const handleOnClickTextFormat = () => {

        if (onClickTextFormat) {
            onClickTextFormat();
        }
    }


    const handleVisibleChange = (visible) => {
        setVisiblePop(visible)
    }

    const handleOnClose = () => {
        setVisiblePop(false)
    }

    return (
        <div
            style={isFocus ? styleBorder : {}}
            id='navigation-chat-box'
        >
            <ul>
                <Popover
                    content={
                        <Sticker
                            onClose={handleOnClose}
                            data={stickers}
                            onScroll={onScroll}
                        />}
                    trigger="click"
                    visible={visiblePop}
                    onVisibleChange={handleVisibleChange}
                    placement='topLeft'
                >
                    <li className='item-chat-box'>
                        <div title='Gửi sticker'>
                            <SmileOutlined />
                        </div>
                    </li>
                </Popover>


                <li className='item-chat-box'>

                    <UploadFile
                        typeOfFile='media'

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
                        typeOfFile='File'

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