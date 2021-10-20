import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CaretDownOutlined, DashOutlined, MessageTwoTone } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import NutshellPinMessageStyle from './NutshellPinMessageStyle';
NutshellPinMessage.propTypes = {
    isItem: PropTypes.bool,
    onOpenDrawer: PropTypes.func,
    message: PropTypes.object,
    quantity: PropTypes.number,
    isCheckbox: PropTypes.bool,
};

NutshellPinMessage.defaultProps = {
    isItem: false,
    onOpenDrawer: null,
    message: {},
    quantity: 0,
    isCheckbox: false

};


const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        </Menu.Item>
    </Menu>
);

function NutshellPinMessage({ isItem, onOpenDrawer, message, quantity, isCheckbox }) {


    const handleOnClickVisbleList = () => {
        if (onOpenDrawer) {
            onOpenDrawer()
        }
    }
    return (
        <div id='nutshell-pin-container'>
            <div className="nutshell-pin-container_left">
                <div className="nutshell-pin-container_icon">
                    <MessageTwoTone />
                </div>

                <div className="nutshell-pin-container_messsage">
                    <div className="nutshell-pin-container_title">
                        Tin nhắn
                    </div>
                    <div className="nutshell-pin-container_detail">
                        {`${message.user.name}: ${message.content}`}
                    </div>

                </div>
            </div>
            <div className="nutshell-pin-container_right">

                {
                    isItem ? (
                        <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']} >
                            <button
                                className='nutshell-pin-container_button-interact'
                            >
                                <DashOutlined />
                            </button>
                        </Dropdown>
                    ) : (

                        <Button
                            style={NutshellPinMessageStyle.BUTTON_LIST}
                            type="primary" ghost
                            onClick={handleOnClickVisbleList}
                        >
                            {`${quantity} ghim tin khác`}<CaretDownOutlined />
                        </Button>

                    )

                }
            </div>
        </div>
    );
}

export default NutshellPinMessage;