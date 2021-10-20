import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Radio, Space } from 'antd';
import { MessageTwoTone } from '@ant-design/icons';
import './style.scss';

ModalChangePinMessage.propTypes = {
    visible: PropTypes.bool.isRequired,
    message: PropTypes.array,
};


ModalChangePinMessage.defaultProps = {
    message: []
};


function ModalChangePinMessage({ visible, message }) {
    const [value, setValue] = useState('');


    const handleOnClickItem = (ele) => {
        setValue(ele._id)
    }

    // onOk={handleOk} onCancel={handleCancel}
    return (
        <div>
            <Modal title="Cập nhật danh sách ghim" visible={visible} >
                <p>Đã đạt giới hạn 3 ghim. Ghim cũ dưới đây sẻ được bỏ để cập nhật nội dung mới</p>
                <div className="modal-change-pin_wapper">
                    {
                        message.map((ele, index) => (
                            <div
                                className="modal-change-pin"
                                key={index}
                                onClick={() => handleOnClickItem(ele)}
                            >
                                <div className="modal-change-pin_left">
                                    <div className="modal-change-pin_icon">
                                        <MessageTwoTone />
                                    </div>


                                    <div className="modal-change-pin_messsage">
                                        <div className="modal-change-pin_title">
                                            Tin nhắn
                                        </div>
                                        <div className="modal-change-pin_detail">
                                            {`${ele.user.name}: ${ele.content}`}
                                        </div>

                                    </div>

                                </div>


                                <div className="modal-change-pin_right">
                                    <Radio checked={value === ele._id ? true : false}></Radio>
                                </div>

                            </div>
                        ))

                    }
                </div>

            </Modal>
        </div>
    );
}

export default ModalChangePinMessage;