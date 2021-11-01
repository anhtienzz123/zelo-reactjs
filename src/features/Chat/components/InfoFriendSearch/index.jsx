import { ExclamationCircleOutlined, SearchOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import InfoTitle from '../InfoTitle';
import PersonalIcon from '../PersonalIcon';
import { Menu, Dropdown, Modal, message } from 'antd';
import conversationApi from 'api/conversationApi';
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
    const { currentConversation } = useSelector(state => state.chat);
    const { confirm } = Modal;


    const handleOnBack = (value) => {
        if (onBack) {
            onBack(value);
        }
    }


    const handleAddFriend = (id) => {

    }

    // confirm xóa thành viên

    function showConfirm(value) {
        confirm({
            title: 'Cảnh báo',
            icon: <ExclamationCircleOutlined />,
            content: <span>Bạn có thực sự muốn xóa <b>{value.name}</b> khỏi nhóm </span>,
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk() {
                removeMember(value._id);
            },
        });
    }

    // Call api xóa thành viên

    async function removeMember(idMember) {
        try {
            console.log(idMember);
            await conversationApi.deleteMember(currentConversation, idMember);
            message.success('Xóa thành công');
        } catch (error) {
            message.error('Xóa thất bại');
        }
    }

    const handleInteractMember = async ({ item, key }, value) => {
        if (key == 1) {
            showConfirm(value);
        }
    }

    const menu = (value) => (
        <Menu onClick={(e) => handleInteractMember(e, value)}>
            <Menu.Item icon={<UserDeleteOutlined />} key="1" danger>
                <span className="menu-icon-danger">Xóa khỏi nhóm</span>
            </Menu.Item>
        </Menu>
    );
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
                                    <Dropdown overlay={() => menu(ele)} trigger={['contextMenu']}>
                                        <div className="info_friend-item">
                                            <div className="info_friend-item-leftside">
                                                <div className="info_friend-item-leftside-avatar">
                                                    <PersonalIcon
                                                        avatar={ele.avatar}
                                                        demention={40}
                                                        name={ele.name}

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
                                    </Dropdown>


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