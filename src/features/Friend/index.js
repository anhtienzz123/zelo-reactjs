
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import SearchContainer from 'features/Chat/containers/SearchContainer';
import ICON_FRIEND from 'assets/images/icon/icon_friend.png';
import ICON_GROUP from 'assets/images/icon/icon_group.png';
import './style.scss';
import ListFriend from './components/ListFriend';
import HeaderFriend from './components/HeaderFiend';
import Scrollbars from 'react-custom-scrollbars';
import ListRequestFriend from './components/ListRequestFriend';
import ListMyFriendRequest from './components/ListMyRequestFriend';
import GroupCard from './components/GroupCard';
import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import ListGroup from './components/ListGroup';

function Friend(props) {
    const { isLoading } = useSelector((state) => state.friend);
    const [subTab, setSubTab] = useState(0);
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
                                                        Tất cả (23) <CaretDownOutlined />
                                                    </div>

                                                    <div className="main-friend_body__filter--right">
                                                        <FilterOutlined /> Theo tên nhóm từ A-Z
                                                    </div>
                                                </div>

                                                <div className="main-friend_body__list-group">
                                                    <ListGroup />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="main-friend_body_list-request">

                                                <div className="main-friend_body_title-list">
                                                    Lời mới kết bạn (1)
                                                </div>
                                                <ListRequestFriend />

                                                <div className="main-friend_body_title-list">
                                                    Đã gửi yêu cầu kết bạn (1)
                                                </div>
                                                <ListMyFriendRequest />


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
