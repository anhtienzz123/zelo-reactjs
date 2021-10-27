import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { DeleteOutlined, ExclamationCircleOutlined, NumberOutlined } from '@ant-design/icons';
import './style.scss';
import { useDispatch } from 'react-redux';
import { fetchMessageInChannel, setCurrentChannel } from 'features/Chat/slice/chatSlice';
import { Dropdown, Menu, message, Modal } from 'antd';
import channelApi from 'api/channelApi';
import ModalChangeNameChannel from '../ModalChangeNameChannel';

ChannelItem.propTypes = {
    isActive: PropTypes.bool,
    data: PropTypes.object,

};

ChannelItem.defaultProps = {
    isActive: false,
    data: {}
};



function ChannelItem({ isActive, data }) {

    const { confirm } = Modal;

    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);


    const handleViewChannel = () => {
        dispatch(setCurrentChannel(data._id));
        dispatch(fetchMessageInChannel({ channelId: data._id, size: 10 }));
    }

    const handleOnClick = ({ _, key }) => {
        if (key === '1') {
            setVisible(true)
        }

        if (key === '2') {
            showConfirm()
        }
    }

    const handleOnCancel = () => {
        setVisible(false)
    }

    const handleOnOk = async (name) => {

        try {
            await channelApi.renameChannel(name, data._id);
            setVisible(false);
            message.success('This is a success message');
        } catch (error) {
            message.error('Đã có lỗi xảy ra');
        }

    }


    function showConfirm() {
        confirm({
            title: 'Cảnh báo',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có thực sự muốn xóa Channel',
            async onOk() {
                try {
                    await channelApi.deleteChannel(data._id);
                    message.success('Xóa Channel thành công');
                } catch (error) {
                    message.error('Đã có lỗi xảy ra');

                }
            },
            okText: 'Xóa',
            cancelText: 'Hủy',
            okType: 'danger'


        });
    }


    const menu = (
        <Menu onClick={handleOnClick}>
            <Menu.Item key="1">
                <span className='menu-item'>Đổi tên Channel</span>
            </Menu.Item>
            <Menu.Item key="2" danger icon={<DeleteOutlined />}>
                <span className='menu-item'>Xóa Channel</span>
            </Menu.Item>
        </Menu>
    );





    return (
        <>
            <Dropdown overlay={menu} trigger={['contextMenu']}>

                <div className={`channel-item ${isActive ? 'active' : ''}`} onClick={handleViewChannel}>
                    <div className="channel-item-icon">
                        <NumberOutlined />
                    </div>

                    <div className="channel-item-text">
                        <span>{data.name}</span>
                    </div>

                    {data.numberUnread > 0 && (
                        <div className='notify-amount'>
                            {data.numberUnread}
                        </div>
                    )}
                </div>


            </Dropdown>


            <ModalChangeNameChannel
                visible={visible}
                onCancel={handleOnCancel}
                onOk={handleOnOk}
            />
        </>

    );
}

export default ChannelItem;