import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    BellOutlined,
    CheckSquareOutlined,
    ContactsOutlined,
    LogoutOutlined,
    MessageOutlined,
    SettingOutlined,
    StarOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './style.scss';
import { Avatar, Badge, Button, Popover, Modal } from 'antd';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import { useDispatch, useSelector } from 'react-redux';
import { setToTalUnread } from '../../slice/chatSlice';
import { useHistory } from 'react-router-dom';

NavbarContainer.propTypes = {};

function NavbarContainer(props) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { user } = useSelector((state) => state.global);

    const { conversations, toTalUnread } = useSelector((state) => state.chat);
    const { amountNotify } = useSelector((state) => state.friend);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(setToTalUnread());
    }, [conversations]);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        history.push('/')
    }

    const content = (
        <div className='pop_up-personal'>
            <div className='pop_up-personal--item' onClick={showModal}>
                <div className='pop_up-personal--item-icon'>
                    <UserOutlined />
                </div>

                <div className='pop_up-personal--item-text'>Tài khoản</div>
            </div>

            <div className='pop_up-personal--item'>
                <div className='pop_up-personal--item-icon'>
                    <LogoutOutlined />
                </div>

                <div className='pop_up-personal--item-text' onClick={handleLogout}>Đăng xuất</div>
            </div>
        </div>
    );

    return (
        <div id='sidebar_wrapper'>
            <div className='sidebar-main'>
                <ul className='sidebar_nav'>
                    <li className='sidebar_nav_item icon-avatar'>
                        <Popover
                            placement='bottomLeft'
                            content={content}
                            trigger='focus'>
                            <Button
                                style={{
                                    height: '48px',
                                    width: '48px',
                                    background: 'none',
                                    outline: 'none',
                                    border: 'red',
                                    padding: '0px',
                                    borderRadius: '50%',
                                }}>
                                <div className='user-icon-navbar'>
                                    <PersonalIcon
                                        isActive={true}
                                        common={false}
                                        avatar={user.avatar}
                                    />
                                </div>
                            </Button>
                        </Popover>
                    </li>
                    <li className='sidebar_nav_item'>
                        <Link to='/chat'>
                            <div className='sidebar_nav_item--icon'>
                                <Badge
                                    count={toTalUnread > 0 ? toTalUnread : 0}>
                                    <MessageOutlined />
                                </Badge>
                            </div>
                        </Link>
                    </li>

                    <li className='sidebar_nav_item'>
                        <Link to='/chat/friends'>
                            <div className='sidebar_nav_item--icon'>
                                <Badge count={amountNotify}>

                                    <ContactsOutlined />
                                </Badge>
                            </div>
                        </Link>
                    </li>

                    <li className='sidebar_nav_item'>
                        <Link to='/notify'>
                            <div className='sidebar_nav_item--icon'>
                                <Badge>
                                    <BellOutlined />
                                </Badge>
                            </div>
                        </Link>
                    </li>

                    <li className='sidebar_nav_item'>
                        <Link to='/todo'>
                            <div className='sidebar_nav_item--icon'>
                                <CheckSquareOutlined />
                            </div>
                        </Link>
                    </li>
                </ul>

                <ul className='sidebar_nav'>
                    <li className='sidebar_nav_item'>
                        <div className='sidebar_nav_item--icon'>
                            <Badge count={0}>
                                <SettingOutlined />
                            </Badge>
                        </div>
                    </li>

                    <li className='sidebar_nav_item'>
                        <div className='sidebar_nav_item--icon'>
                            <Badge count={0}>
                                <StarOutlined />
                            </Badge>
                        </div>
                    </li>
                </ul>
            </div>

            <Modal
                title='Cập nhật thông tin'
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}>
                <p>Cập nhật thông tin</p>
            </Modal>
        </div>
    );
}

export default NavbarContainer;
