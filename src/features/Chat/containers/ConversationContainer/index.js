import { DeleteFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Modal } from 'antd';
import conversationApi from 'api/conversationApi';
import SubMenuClassify from 'components/SubMenuClassify';
import ConversationSingle from 'features/Chat/components/ConversationSingle';
import {
    fetchChannels,
    fetchListMessages,
    getLastViewOfMembers,
    setCurrentChannel,
} from 'features/Chat/slice/chatSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getMembersConversation,
    setTypeOfConversation,
} from '../../slice/chatSlice';
import './style.scss';

ConversationContainer.propTypes = {
    valueClassify: PropTypes.string.isRequired,
};

ConversationContainer.defaultProps = {
    valueClassify: '',
};

function ConversationContainer({ valueClassify, onClickConver }) {
    const dispatch = useDispatch();
    const { conversations, classifies } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.global);

    const tempClassify =
        classifies.find((ele) => ele._id === valueClassify) || 0;

    const checkConverInClassify = (idMember) => {
        if (tempClassify === 0) return true;
        const index = tempClassify.conversationIds.findIndex(
            (ele) => ele == idMember
        );
        return index > -1;
    };

    const converFilter = [...conversations].filter((ele) => {
        if (checkConverInClassify(ele._id)) return true;
    });

    const handleConversationClick = async (conversationId) => {
        // dispatch(setCurrentConversation(conversationId));

        dispatch(setCurrentChannel(''));
        dispatch(getLastViewOfMembers({ conversationId }));
        dispatch(fetchListMessages({ conversationId, size: 10 }));

        dispatch(getMembersConversation({ conversationId }));
        dispatch(setTypeOfConversation(conversationId));
        dispatch(fetchChannels({ conversationId }));
    };

    const handleOnClickItem = (e, id) => {
        if (e.key == 1) {
            confirm(id);
        }
    };

    const deleteConver = async (id) => {
        try {
            await conversationApi.deleteConversation(id);
            message.success('X??a th??nh c??ng');
        } catch (error) {
            message.error('???? c?? l???i x???y ra');
        }
    };

    function confirm(id) {
        Modal.confirm({
            title: 'X??c nh???n',
            icon: <ExclamationCircleOutlined />,
            content: (
                <span>
                    To??n b??? n???i dung cu???c tr?? chuy???n s??? b??? x??a, b???n c?? ch???c ch???n
                    mu???n x??a ?
                </span>
            ),
            okText: 'X??a',
            cancelText: 'Kh??ng',
            onOk: () => {
                deleteConver(id);
            },
        });
    }

    return (
        <>
            <div id="conversation-main">
                <ul className="list_conversation">
                    {converFilter.map((conversationEle, index) => {
                        if (true) {
                            const { numberUnread } = conversationEle;
                            if (conversationEle.lastMessage) {
                                return (
                                    <Dropdown
                                        key={index}
                                        overlay={
                                            <Menu
                                                onClick={(e) =>
                                                    handleOnClickItem(
                                                        e,
                                                        conversationEle._id
                                                    )
                                                }
                                            >
                                                <SubMenuClassify
                                                    data={classifies}
                                                    idConver={
                                                        conversationEle._id
                                                    }
                                                />

                                                {user._id ===
                                                    conversationEle.leaderId && (
                                                    <Menu.Item
                                                        danger
                                                        key="1"
                                                        icon={<DeleteFilled />}
                                                    >
                                                        Xo?? h???i tho???i
                                                    </Menu.Item>
                                                )}
                                            </Menu>
                                        }
                                        trigger={['contextMenu']}
                                    >
                                        <li
                                            key={index}
                                            className={`conversation-item ${
                                                numberUnread === 0
                                                    ? ''
                                                    : 'arrived-message'
                                            } `}
                                        >
                                            <ConversationSingle
                                                conversation={conversationEle}
                                                onClick={
                                                    handleConversationClick
                                                }
                                            />
                                        </li>
                                    </Dropdown>
                                );
                            }
                        }
                    })}
                </ul>
            </div>
        </>
    );
}

export default ConversationContainer;
