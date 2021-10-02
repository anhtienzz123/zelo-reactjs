import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Input, Modal } from 'antd';
ModalAddFriend.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onSearch: PropTypes.func,
};

ModalAddFriend.defaultProps = {
    onCancel: null,
    onSearch: null
};

function ModalAddFriend({ isVisible, onCancel, onSearch }) {
    const [value, setValue] = useState('');

    const handleOk = () => {
        if (onSearch) {
            onSearch(value);
        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }

    const handleInputChange = ({ target: { value } }) => {
        setValue(value);
    }

    return (

        <Modal
            title="Thêm bạn"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            // centered
            width={360}
            okText='Tìm kiếm'
            cancelText='Hủy'
            okButtonProps={{ disabled: !(value.trim().length > 0) }}
        >
            <div className="input-add-friend_wrapper">
                <Input
                    placeholder="Nhập số điện thoại hoặc email"
                    // type='number'
                    allowClear
                    value={value}
                    onChange={handleInputChange}

                />
            </div>

        </Modal>

    );
}

export default ModalAddFriend;