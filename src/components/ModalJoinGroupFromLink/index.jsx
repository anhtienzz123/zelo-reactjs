import { Col, Divider, message, Modal, Row } from 'antd';
import conversationApi from 'api/conversationApi';
import ConversationAvatar from 'features/Chat/components/ConversationAvatar';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import {
    fetchListMessages,
    getLastViewOfMembers,
    getMembersConversation,
    setTypeOfConversation
} from 'features/Chat/slice/chatSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import MODAL_JOIN_FROM_LINK_STYLE from './ModalJoinGroupFromLinkStyle';
import './style.scss';

ModalJoinGroupFromLink.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    info: PropTypes.object,
};

ModalJoinGroupFromLink.defaultProps = {
    info: {}
}

function ModalJoinGroupFromLink({ isVisible, info, onCancel }) {


    const { _id, name, users } = info;
    const dispatch = useDispatch();

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        }
    }


    const handleOk = async () => {

        try {
            await conversationApi.joinGroupFromLink(_id);
            handleCancel();
            message.success('Tham gia nhóm thành công');
        } catch (error) {
            console.log(error);

        }
    }





    return (
        <Modal
            title="Thông tin nhóm"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Tham gia'
            cancelText='Hủy'
            bodyStyle={MODAL_JOIN_FROM_LINK_STYLE.BODY_MODAL}
            width={MODAL_JOIN_FROM_LINK_STYLE.WIDTH}
            style={MODAL_JOIN_FROM_LINK_STYLE.STYLE}
        >
            <div className="modal-join-link">
                <div className="modal-join-link_info">
                    <div className="modal-join-link_avatar">
                        <ConversationAvatar
                            totalMembers={users.length}
                            avatar={users.map(ele => ele.avatar)}
                            type={true}
                            isGroupCard={true}
                            demension={52}
                        />
                    </div>

                    <div className="modal-join-link_name">
                        {name}
                    </div>

                    <div className="modal-join-link_members">
                        {`${users.length} thành viên`}
                    </div>

                </div>
                <Divider />

                <div className="modal-join-link_list-member">

                    <Row gutter={[8, 8]}>
                        {users.map((ele, index) => (
                            <Col span={8} key={index} >
                                <div className="member-item">
                                    <div className="member-item_avatar">
                                        <PersonalIcon
                                            avatar={ele.avatar}
                                            name={ele.name}

                                        />
                                    </div>
                                    <div className="member-item_name">
                                        {`${ele.name}`}
                                    </div>
                                </div>
                            </Col>
                        ))}



                    </Row>



                </div>
            </div>
        </Modal>
    );
}

export default ModalJoinGroupFromLink;