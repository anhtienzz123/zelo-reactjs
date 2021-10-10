
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spin } from 'antd';
import SearchContainer from 'features/Chat/containers/SearchContainer';
import ICON_FRIEND from 'assets/images/icon/icon_friend.png';
import ICON_GROUP from 'assets/images/icon/icon_group.png';
import './style.scss';
import ListFriend from './components/ListFriend';
import HeaderFriend from './components/HeaderFiend';
import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons';
import Scrollbars from 'react-custom-scrollbars';
import ListFriendCard from './components/ListFriendCard';
import ModalVideo from 'react-modal-video';






function Friend(props) {
    const { isLoading } = useSelector((state) => state.friend);
    const [isOpen, setOpen] = useState(false);


    return (



        <div id="main-friend_wrapper">

            {/* <React.Fragment>
                <ModalVideo
                    channel='custom'
                    autoplay url={'http://res.cloudinary.com/zelo-chat/video/upload/v1633795340/cdycbcmrcx6fl80ejkhb.mp4'}
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                    animationSpeed
                    ratio='16:9'
                    style={{ height: "800px" }}


                />


            </React.Fragment>
            <button className="btn-primary" onClick={() => setOpen(true)}>VIEW DEMO</button> */}
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
                            <div className="main-friend_sidebar_option main-friend_sidebar_option--add-fiend">
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

                            <div className="main-friend_sidebar_option main-friend_sidebar_option--groups">
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
                            <div className="main-friend_body__filter">
                                <div className="main-friend_body__filter--left">
                                    Tất cả (23) <CaretDownOutlined />
                                </div>

                                <div className="main-friend_body__filter--right">
                                    <FilterOutlined /> Theo tên nhóm từ A-Z
                                </div>
                            </div>

                            <div className="main-friend_body_item">
                                <Scrollbars
                                    autoHide={true}
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    style={{ 'height': '100%' }}


                                >

                                    <ListFriendCard />






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
