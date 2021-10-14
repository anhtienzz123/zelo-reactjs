import { DeleteFilled, ExclamationCircleOutlined, TagTwoTone } from '@ant-design/icons';
import { Dropdown, Menu, message, Modal } from 'antd';
import conversationApi from 'api/conversationApi';
import SubMenuClassify from 'components/SubMenuClassify';
import {
    fetchListMessages
} from 'features/Chat/chatSlice';
import ConversationSingle from 'features/Chat/components/ConversationSingle';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { getMembersConversation, setCurrentConversation, setTypeOfConversation } from '../../chatSlice';
import './style.scss';
ConversationContainer.propTypes = {};


function ConversationContainer(props) {
    const dispatch = useDispatch();
    const { conversations, classifies } = useSelector((state) => state.chat);



    const handleConversationClick = (conversationId) => {
        // dispatch(setCurrentConversation(conversationId));
        dispatch(fetchListMessages({ conversationId, size: 10 }));

        dispatch(getMembersConversation({ conversationId }));
        dispatch(setTypeOfConversation(conversationId));

    };



    const handleOnClickItem = (e, id) => {
        if (e.key == 1) {
            confirm(id);
        }
    };

    const deleteConver = async (id) => {
        try {
            await conversationApi.deleteConversation(id);
            message.success('Xóa thành công');
        } catch (error) {
            message.error('Bạn không thể xóa nhóm này! Hãy chọn tính năng rời nhóm');
        }

    }


    function confirm(id) {
        Modal.confirm({
            title: "Xác nhận",
            icon: <ExclamationCircleOutlined />,
            content: <span>Toàn bộ nội dung cuộc trò chuyện sẻ bị xóa, bạn có chắc chắn muốn xóa ?</span>,
            okText: 'Xóa',
            cancelText: 'Không',
            onOk: () => {
                deleteConver(id)
            }
        });
    }




    return (
        <>
            <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                autoHideDuration={200}>
                <div id='conversation-main'>

                    <ul className='list_conversation' >

                        {conversations.map((conversationEle, index) => {
                            const { numberUnread } = conversationEle;
                            if (conversationEle.lastMessage) {
                                return (
                                    <Dropdown
                                        key={index}
                                        overlay={
                                            <Menu onClick={(e) => handleOnClickItem(e, conversationEle._id)}>
                                                <SubMenuClassify
                                                    data={classifies}
                                                    idConver={conversationEle._id}
                                                />

                                                <Menu.Item danger key="1" icon={<DeleteFilled />}>Xoá hội thoại</Menu.Item>
                                            </Menu>
                                        }
                                        trigger={['contextMenu']}


                                    >

                                        <li
                                            key={index}
                                            className={`conversation-item ${numberUnread === 0
                                                ? ''
                                                : 'arrived-message'
                                                } `}
                                        >
                                            <ConversationSingle
                                                conversation={conversationEle}
                                                onClick={handleConversationClick}
                                            />
                                        </li>
                                    </Dropdown>

                                );
                            }
                        })}
                    </ul>

                </div>
            </Scrollbars>

        </>
    );
}

export default ConversationContainer;
