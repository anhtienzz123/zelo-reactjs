import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { DashOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import { Menu, Dropdown, Button } from 'antd';
import conversationApi from 'api/conversationApi';
import { fetchListMessages, setConversations, setCurrentConversation } from 'features/Chat/chatSlice';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

FriendItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClickMenu: PropTypes.func,
};

FriendItem.defaultProps = {
    onClickMenu: null
};

function FriendItem({ data, onClickMenu }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleClickMenu = ({ key }) => {
        if (onClickMenu) {
            onClickMenu(key, data._id);
        }
    }

    const handleClickFriendItem = async () => {
        const response = await conversationApi.createConversationIndividual(data._id);
        const { _id, isExists } = response;

        if (!isExists) {
            const conver = await conversationApi.getConversationById(data._id);
            dispatch(setConversations(conver));
        }

        dispatch(fetchListMessages({ conversationId: _id, size: 10 }));
        dispatch(setCurrentConversation(_id));

        history.push({
            pathname: '/chat',
        });
    }

    const menu = (
        <Menu onClick={handleClickMenu}>
            <Menu.Item key="1" icon={<InfoCircleOutlined />}>
                <span className='menu-item--highlight'>Xem thông tin</span>
            </Menu.Item>
            <Menu.Item key="2" danger icon={<DeleteOutlined />}>
                <span className='menu-item--highlight'>Xóa bạn</span>
            </Menu.Item>
        </Menu>
    );

    return (

        <Dropdown overlay={menu} trigger={['contextMenu']}>
            <div id='friend-item' onClick={handleClickFriendItem}>
                <div className="friend-item_left">
                    <div className="friend-item-avatar">
                        <PersonalIcon
                            isActive={data.isOnline && data.isOnline}
                            avatar={data.avatar}
                        />
                    </div>

                    <div className="friend-item-name">
                        {data.name}
                    </div>

                    {data.lastLogin && data.lastLogin}
                </div>
                <div className="friend-item_right">
                    <div className="friend-item-interact">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button
                                type='text'
                                icon={<DashOutlined />}
                                style={{ background: 'eeeff2' }}
                            />

                        </Dropdown>
                    </div>
                </div>


            </div>
        </Dropdown>

    );
}

export default FriendItem;