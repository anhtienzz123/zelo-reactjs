
import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row } from 'antd';
import ICON_FRIEND from 'assets/images/icon/icon_friend.png';
import ICON_GROUP from 'assets/images/icon/icon_group.png';
import SearchContainer from 'features/Chat/containers/SearchContainer';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import HeaderFriend from './components/HeaderFiend';
import ListFriend from './components/ListFriend';
import ListGroup from './components/ListGroup';
import ListMyFriendRequest from './components/ListMyRequestFriend';
import ListRequestFriend from './components/ListRequestFriend';
import FRIEND_STYLE from './friendStyle';
import classifyUtils from 'utils/classifyUtils';
import './style.scss';

function Friend(props) {
    const { isLoading, requestFriends, myRequestFriend, groups } = useSelector((state) => state.friend);
    const [subTab, setSubTab] = useState(0);






    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            </Menu.Item>
        </Menu>

    );


    return (
        <div id="main-friend_wrapper">
            <Row gutter={[0, 0]}>
                <Col span={5}>
                    <div className="main-friend_sidebar">
                        <div className='main-friend_sidebar_search-bar'>
                            <SearchContainer />
                        </div>

                        <div className='divider-layout'>
                            <div></div>
                        </div>

                        <div className='main-friend_sidebar_bottom'>
                            <div
                                className="main-friend_sidebar_option main-friend_sidebar_option--add-fiend"
                                onClick={() => setSubTab(0)}
                            >
                                <div className="main-friend_sidebar_option_img">
                                    <img
                                        src={ICON_FRIEND}
                                        alt="ICON_FRIEND"
                                    />
                                </div>

                                <div className="main-friend_sidebar_option_text">
                                    Danh sách kết bạn
                                </div>

                            </div>

                            <div
                                className="main-friend_sidebar_option main-friend_sidebar_option--groups"
                                onClick={() => setSubTab(1)}
                            >
                                <div className="main-friend_sidebar_option_img">
                                    <img
                                        src={ICON_GROUP}
                                        alt="ICON_GROUP"
                                    />
                                </div>

                                <div className="main-friend_sidebar_option_text">
                                    Danh sách nhóm
                                </div>
                            </div>

                            <div className='divider-layout'>
                                <div></div>
                            </div>

                            <div className="main-friend_sidebar_list-friend">
                                <div className="main-friend_sidebar_list-friend_title">
                                    Bạn bè (68)
                                </div>
                                <ListFriend />
                            </div>
                        </div>
                    </div>



                </Col>

                <Col span={19}>
                    <div className="main-friend_body">
                        <div className="main-friend_body__header">
                            <HeaderFriend />
                        </div>
                        <div className="main-friend_body__section">


                            <div className="main-friend_body_item">
                                <Scrollbars
                                    autoHide={true}
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    style={{ 'height': '100%' }}


                                >

                                    {
                                        subTab ? (
                                            <>
                                                <div className="main-friend_body__filter">
                                                    <div className="main-friend_body__filter--left">

                                                        <Dropdown overlay={menu} placement="bottomLeft">
                                                            <Button
                                                                icon={<CaretDownOutlined />}
                                                                type='text'
                                                                style={FRIEND_STYLE.BUTTON_FILTER}
                                                            >
                                                                Tất cả (23)
                                                            </Button>
                                                        </Dropdown>
                                                    </div>

                                                    <div className="main-friend_body__filter--right">


                                                        <Dropdown overlay={menu} placement="bottomLeft">
                                                            <Button
                                                                icon={<FilterOutlined />}
                                                                type='text'
                                                                style={FRIEND_STYLE.BUTTON_FILTER}
                                                            >
                                                                Theo tên nhóm từ A-Z
                                                            </Button>
                                                        </Dropdown>
                                                    </div>
                                                </div>

                                                <div className="main-friend_body__list-group">
                                                    <ListGroup
                                                        data={groups}
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="main-friend_body_list-request">

                                                <div className="main-friend_body_title-list">
                                                    Lời mới kết bạn ({requestFriends.length})
                                                </div>
                                                <ListRequestFriend
                                                    data={requestFriends}

                                                />

                                                <div className="main-friend_body_title-list">
                                                    Đã gửi yêu cầu kết bạn ({myRequestFriend.length})
                                                </div>
                                                <ListMyFriendRequest
                                                    data={myRequestFriend}
                                                />


                                            </div>
                                        )
                                    }
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>



    )
}

export default Friend;
