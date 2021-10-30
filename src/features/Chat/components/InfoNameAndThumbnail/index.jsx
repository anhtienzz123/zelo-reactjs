import { EditOutlined } from '@ant-design/icons';
import { Modal, Input, message } from 'antd';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import ConversationAvatar from '../ConversationAvatar';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import conversationApi from 'api/conversationApi';
import { updateNameOfConver } from 'features/Chat/slice/chatSlice';
import UploadAvatar from 'components/UploadAvatar';

InfoNameAndThumbnail.propTypes = {
    conversation: PropTypes.object,
};

InfoNameAndThumbnail.defaultProps = {
    conversation: {}
};


function InfoNameAndThumbnail({ conversation }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState('');
    const { currentConversation } = useSelector(state => state.chat);
    const dispatch = useDispatch();
    const refInitValue = useRef();



    useEffect(() => {
        if (conversation.type) {
            setValue(conversation.name);
            refInitValue.current = conversation.name;
        }
    }, [currentConversation, isModalVisible])


    function handleOnClick() {
        setIsModalVisible(true)
    }
    function handleCancel() {
        setIsModalVisible(false)
    }

    async function handleOk() {
        try {
            await conversationApi.changeNameConversation(currentConversation, value);
            message.success('Đổi tên nhóm thành công');
        } catch (error) {
        }
        setIsModalVisible(false);


    }
    const handleInputChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <div className='info_name-and-thumbnail'>

            <Modal
                title='Cập nhật cuộc trò chuyện'
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText='Thay đổi'
                cancelText='Hủy'
                closable={false}
                okButtonProps={{ disabled: (refInitValue.current === value || value.trim().length === 0) }}
            >

                <div className="update-profile_wrapper">

                    <div className="update-profile_upload">
                        <UploadAvatar />
                    </div>

                    <div className="update-profile_input">
                        <Input
                            placeholder="Nhập tên mới"
                            onChange={handleInputChange}
                            value={value}
                        />
                    </div>
                </div>



            </Modal>
            <div className="info-thumbnail">
                <ConversationAvatar
                    isGroupCard={true}
                    totalMembers={conversation.totalMembers}
                    type={conversation.type}
                    avatar={conversation.avatar}
                    name={conversation.name}

                />
            </div>

            <div className="info-name-and-button">
                <div className='info-name'>
                    <span>{conversation.name}</span>
                </div>

                {conversation.type && (
                    <div className='info-button'>
                        <EditOutlined onClick={handleOnClick} />
                    </div>
                )}

            </div>

        </div>
    );
}

export default InfoNameAndThumbnail;