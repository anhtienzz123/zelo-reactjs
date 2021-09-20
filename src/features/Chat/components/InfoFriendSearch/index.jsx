import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import InfoTitle from '../InfoTitle';
import PersonalIcon from '../PersonalIcon';
import './style.scss';
InfoFriendSearch.propTypes = {
    onBack: PropTypes.func,
    members: PropTypes.array,
};

InfoFriendSearch.defaultProps = {
    onBack: null,
    members: [],
};

function InfoFriendSearch(props) {
    const { onBack, members } = props;
    const { user } = useSelector(state => state.global);


    const handleOnBack = (value) => {
        if (onBack) {
            onBack(value);
        }
    }


    const handleAddFriend = (id) => {

    }
    return (
        <div id='info_friend-search'>
            <div className="info_friend-search--title">
                <InfoTitle
                    isBack={true}
                    text="Thành viên"
                    onBack={handleOnBack}
                    isSelect={false}
                />
            </div>

            <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                autoHideDuration={200}
                style={{ width: '100%' }}



            >

                <div className="info_friend-search-content">
                    <div className="info_friend-add-member">
                        <button>
                            <UserAddOutlined />
                            <span>&nbsp;Thêm Thành viên</span>
                        </button>
                    </div>

                    <div className="info_friend-searchbar-and-title">
                        <div className="info_friend-search-title">
                            <strong>{`Danh sách thành viên (${members.length})`}</strong>
                        </div>

                        <div className="info_friend-searchbar">
                            <Input placeholder="Tìm kiếm thành viên" prefix={<SearchOutlined />} />
                        </div>

                        <div className="info_friend-list">
                            {
                                members.map(ele => (
                                    <div className="info_friend-item">
                                        <div className="info_friend-item-leftside">
                                            <div className="info_friend-item-leftside-avatar">
                                                <PersonalIcon
                                                    avatar={ele.avatar}
                                                    demention={40}

                                                />
                                            </div>

                                            <div className="info_friend-item-leftside-name">
                                                <strong>{ele.name}</strong>
                                                {/* <span>Trưởng Nhóm</span> */}
                                            </div>



                                        </div>

                                        <div className={`info_friend-item-rightside ${(ele.isFriend || ele._id === user._id) && 'hidden'}`}>
                                            <Button
                                                type='primary'
                                                onClick={() => handleAddFriend(ele._id)}
                                            >
                                                Kết bạn
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            }
                            {/* 
                            {tempMembers} */}

                        </div>
                    </div>
                </div>
            </Scrollbars>


        </div>
    );
}

export default InfoFriendSearch;