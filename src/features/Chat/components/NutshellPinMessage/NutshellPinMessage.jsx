import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CaretDownOutlined, DashOutlined, MessageTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message as MessageNotify, Modal } from 'antd';
import NutshellPinMessageStyle from './NutshellPinMessageStyle';
import pinMessageApi from 'api/pinMessageApi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPinMessages } from '../../slice/chatSlice';
NutshellPinMessage.propTypes = {
    isItem: PropTypes.bool,
    onOpenDrawer: PropTypes.func,
    message: PropTypes.object,
    quantity: PropTypes.number,
    isCheckbox: PropTypes.bool,
    onViewNews: PropTypes.func,
    isHover: PropTypes.bool,
};

NutshellPinMessage.defaultProps = {
    isItem: false,
    onOpenDrawer: null,
    message: {},
    quantity: 0,
    isCheckbox: false,
    onViewNews: null,
    isHover: true

};



function NutshellPinMessage({ isItem, onOpenDrawer, message, quantity, onViewNews, isHover }) {
    const dispatch = useDispatch();
    const { currentConversation } = useSelector(state => state.chat);



    function confirm() {
        Modal.confirm({
            title: 'Bỏ ghim',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc muốn bỏ ghim nội dung này không ?',
            okText: 'Bỏ ghim',
            cancelText: 'Không',
            onOk: async () => {
                await pinMessageApi.removePinMessage(message._id);
                MessageNotify.success('Xóa thành công')
                dispatch(fetchPinMessages({ conversationId: currentConversation }))
            },
            okButtonProps: { type: 'danger' }
        });
    }


    const handleOnClickMenu = ({ item, key }) => {
        if (key === '1') {
            confirm()
        }

        if (key === '2') {
            if (onViewNews) {
                onViewNews();
            }
        }
    };


    const menu = (
        <Menu onClick={handleOnClickMenu} >
            <Menu.Item key="1" danger>
                <span style={NutshellPinMessageStyle.MENU_ITEM}>Bỏ gim</span>
            </Menu.Item>

            <Menu.Item key="2" >
                <span style={NutshellPinMessageStyle.MENU_ITEM} className="menu-item">Mở bảng tin nhóm</span>
            </Menu.Item>
        </Menu>
    );


    const handleOnClickVisbleList = () => {
        if (onOpenDrawer) {
            onOpenDrawer()
        }
    }
    return (
        <div className={`nutshell-pin-container ${isItem ? 'select' : ''} ${isHover ? '' : 'no-hover'}`}>
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
            <div className={`nutshell-pin-container_right ${isItem ? 'no-display' : ''}`}>

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