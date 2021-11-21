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
import { Badge, Button, Modal, Popover } from 'antd';
import { setTabActive } from 'app/globalSlice';
import ModalUpdateProfile from "features/Chat/components/ModalUpdateProfile";
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setToTalUnread } from '../../slice/chatSlice';
import './style.scss';

NavbarContainer.propTypes = {};

function NavbarContainer(props) {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { user, tabActive } = useSelector((state) => state.global);

    const { conversations, toTalUnread } = useSelector((state) => state.chat);
    const { amountNotify } = useSelector((state) => state.friend);
    //model
    const [isModalUpdateProfileVisible, setIsModalUpdateProfileVisible] =
        useState(false);

    const dispatch = useDispatch();

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
        window.location.reload();
    };

    const handleSetTabActive = (value) => {
        dispatch(setTabActive(value));
    };

    // --- HANDLE UPDATE PROFILE
    const handleUpdateProfile = () => {
        setIsModalUpdateProfileVisible(true);
    };

    const handleCancelModalUpdateProfile = (value) => {
        setIsModalUpdateProfileVisible(value);
    };

    const handleOklModalUpdateProfile = (value) => {
        setConfirmLoading(true);
        setConfirmLoading(false);
        setIsModalUpdateProfileVisible(false);
    };

    const content = (
        <div className="pop_up-personal">
            <div className="pop_up-personal--item" onClick={handleUpdateProfile}>
                <div className="pop_up-personal--item-icon">
                    <UserOutlined />
                </div>

                <div className="pop_up-personal--item-text">Tài khoản</div>
            </div>

            <div className="pop_up-personal--item">
                <div className="pop_up-personal--item-icon">
                    <LogoutOutlined />
                </div>

                <div
                    className="pop_up-personal--item-text"
                    onClick={handleLogout}
                >
                    Đăng xuất
                </div>
            </div>
        </div>
    );

    return (
        <div id="sidebar_wrapper">
            <div className="sidebar-main">
                <ul className="sidebar_nav">
                    <li className="sidebar_nav_item icon-avatar">
                        <Popover
                            placement="bottomLeft"
                            content={content}
                            trigger="focus"
                        >
                            <Button
                                style={{
                                    height: '48px',
                                    width: '48px',
                                    background: 'none',
                                    outline: 'none',
                                    border: 'red',
                                    padding: '0px',
                                    borderRadius: '50%',
                                }}
                            >
                                <div className="user-icon-navbar">
                                    <PersonalIcon
                                        isActive={true}
                                        common={false}
                                        avatar={user.avatar}
                                        name={user.name}
                                        color={user.avatarColor}
                                    />
                                </div>
                            </Button>
                        </Popover>
                    </li>

                    <Link className="link-icon" to="/chat">
                        <li
                            className={`sidebar_nav_item  ${tabActive === 1 ? 'active' : ''
                                }`}
                            onClick={() => handleSetTabActive(1)}
                        >
                            <div className="sidebar_nav_item--icon">
                                <Badge
                                    count={toTalUnread > 0 ? toTalUnread : 0}
                                >
                                    <MessageOutlined />
                                </Badge>
                            </div>
                        </li>
                    </Link>

                    <Link className="link-icon" to="/chat/friends">
                        <li
                            className={`sidebar_nav_item  ${tabActive === 2 ? 'active' : ''
                                }`}
                            onClick={() => handleSetTabActive(2)}
                        >
                            <div className="sidebar_nav_item--icon">
                                <Badge count={amountNotify}>
                                    <ContactsOutlined />
                                </Badge>
                            </div>
                        </li>
                    </Link>

                    {/* <li className='sidebar_nav_item'>
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
                    </li> */}
                </ul>

                <ul className="sidebar_nav">
                    <li className="sidebar_nav_item">
                        <div className="sidebar_nav_item--icon">
                            <Badge count={0}>
                                <SettingOutlined />
                            </Badge>
                        </div>
                    </li>

                    {/* <li className='sidebar_nav_item'>
                        <div className='sidebar_nav_item--icon'>
                            <Badge count={0}>
                                <StarOutlined />
                            </Badge>
                        </div>
                    </li> */}
                </ul>
            </div>
            <ModalUpdateProfile
                isVisible={isModalUpdateProfileVisible}
                onCancel={handleCancelModalUpdateProfile}
                onOk={handleOklModalUpdateProfile}
                loading={confirmLoading}
            />
        </div>
    );
}

export default NavbarContainer;
