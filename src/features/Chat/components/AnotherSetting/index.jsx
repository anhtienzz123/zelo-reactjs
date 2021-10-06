import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CaretDownOutlined, DeleteOutlined, ExclamationCircleOutlined, ExportOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import conversationApi from 'api/conversationApi';
import { leaveGroup } from '../../chatSlice';
import './style.scss';
import { message, Modal } from 'antd';
import { socket } from 'utils/socketClient';
AnotherSetting.propTypes = {

};

const styleIconDrop = {
    transform: 'rotate(-90deg)'
}

const styleInteract = {
    maxHeight: "0px",
}


function AnotherSetting(props) {
    const [isDrop, setIsDrop] = useState(true);
    const { currentConversation } = useSelector(state => state.chat);
    const dispatch = useDispatch();


    const handleOnClick = () => {
        setIsDrop(!isDrop);
    }



    function confirm() {
        Modal.confirm({
            title: 'Cảnh báo',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có thực sự muốn rời khỏi nhóm',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await conversationApi.leaveGroup(currentConversation);
                    message.success(`Rời nhóm thành công`);

                    socket.emit('leave-conversation', currentConversation);

                    dispatch(leaveGroup(currentConversation));
                } catch (error) {
                    message.error(`Rời nhóm thất bại`);
                }

            }
        });
    }

    return (
        <div className="info_setting">
            <div
                className="info_setting-header"
                onClick={handleOnClick}
            >
                <div className="info_setting-header-title">
                    Cài đặt khác
                </div>

                <div className="info_setting-header-icon" style={isDrop ? {} : styleIconDrop}>
                    <CaretDownOutlined />
                </div>
            </div>

            <div className="info_setting-interact" style={isDrop ? {} : styleInteract}>
                <div className="info_setting-interact-amount danger" onClick={confirm}>
                    <div className="info_setting-interact-amount-icon">
                        <ExportOutlined />
                    </div>

                    <div className="info_setting-interact-amount-text">
                        <span>Rời nhóm</span>
                    </div>
                </div>


                <div className="info_setting-interact-amount danger">
                    <div className="info_setting-interact-amount-icon">
                        <DeleteOutlined />
                    </div>

                    <div className="info_setting-interact-amount-text">
                        <span>Xóa cuộc trò chuyện</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnotherSetting;