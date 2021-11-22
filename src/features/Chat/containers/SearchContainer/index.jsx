import { AlignLeftOutlined, AppstoreAddOutlined, SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Input, message, Radio } from 'antd';
import friendApi from 'api/friendApi';
import userApi from 'api/userApi';
import ModalAddFriend from 'components/ModalAddFriend';
import UserCard from 'components/UserCard';
import ModalClassify from 'features/Chat/components/ModalClassify';
import ModalCreateGroup from 'features/Chat/components/ModalCreateGroup';
import { createGroup } from 'features/Chat/slice/chatSlice';
import { fetchListMyRequestFriend } from 'features/Friend/friendSlice';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
SearchContainer.propTypes = {

};

function SearchContainer(props) {

    const [valueSearch, setValueSearch] = useState(0);
    const [isModalCreateGroupVisible, setIsModalCreateGroupVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { classifies } = useSelector(state => state.chat);
    const [isShowModalClasify, setIsShowModalClasify] = useState(false);
    const [isShowModalAddFriend, setShowModalAddFriend] = useState(false);
    const [userIsFind, setUserIsFind] = useState({});
    const [visibleUserCard, setVisbleUserCard] = useState(false);
    const dispatch = useDispatch();


    // -----  HANDLE MODAL CLASSIFY

    const handleCreateClasify = () => {
        setIsShowModalClasify(true);
    }

    const handleCancelClassifyModal = () => {
        setIsShowModalClasify(false);
    }

    const handleOpenModalClassify = () => {
        setIsShowModalClasify(true)
    }

    // ------ 



    const handleOnChange = (e) => {
        console.log(e.target.value);
        setValueSearch(e.target.value);
    };

    console.log('value serarch', valueSearch);


    // --- HANDLE CREATE GROUP

    const handleCreateGroup = () => {
        setIsModalCreateGroupVisible(true);
    }


    const handleCancelModalCreatGroup = (value) => {
        setIsModalCreateGroupVisible(value);
    }

    const handleOklModalCreatGroup = (value) => {
        setConfirmLoading(true);
        dispatch(createGroup(value));
        setConfirmLoading(false);
        setIsModalCreateGroupVisible(false);
    }

    // -----



    // HANDLE ADD FRIEND

    const handleOpenModalAddFriend = () => {
        setShowModalAddFriend(true);
    }

    const handeCancelModalAddFriend = () => {
        setShowModalAddFriend(false);
    }

    const handFindUser = async (value) => {
        try {
            const user = await userApi.fetchUser(value);
            setUserIsFind(user);
            setVisbleUserCard(true);
            setShowModalAddFriend(false);
        } catch (error) {
            message.error('Không tìm thấy người dùng');
        }
    }
    const handOnSearchUser = (value) => {
        handFindUser(value);
    }


    const handleOnEnter = (value) => {
        handFindUser(value);
    }

    // ------------



    const handleCancelModalUserCard = () => {
        setVisbleUserCard(false);
    }



    return (
        <div id='search-wrapper'>
            <div className="search-main">
                <div className="search-top">
                    <div className="search-top_input-search">
                        <Input
                            placeholder="Tìm kiếm"
                            prefix={<SearchOutlined />}
                        />
                    </div>

                    <div className="search-top_add-friend" onClick={handleOpenModalAddFriend}>
                        <UserAddOutlined />
                    </div>

                    <div className="search-top_create-group" onClick={handleCreateGroup}>
                        <UsergroupAddOutlined />
                    </div>
                </div>

                <div className="search-bottom">
                    <div className='classify-title'>
                        <div>
                            <AlignLeftOutlined /> &nbsp;
                            <span>Phân loại</span>
                        </div>
                        <div className='add-classify' onClick={handleCreateClasify}>
                            <AppstoreAddOutlined />
                        </div>

                    </div>

                    <div className='classify-element'>
                        <Scrollbars
                            autoHide={true}
                            autoHideTimeout={1000}
                            autoHideDuration={200}
                            style={{ height: '42px', width: '100%' }}
                        >

                            <Radio.Group onChange={handleOnChange} value={valueSearch} size='small' >
                                <Radio value={0}>Tất cả</Radio>
                                {classifies.map((ele, index) => (
                                    <Radio key={index} value={ele._id}>{ele.name}</Radio>
                                ))}


                            </Radio.Group>


                        </Scrollbars>

                    </div>
                </div>
            </div>


            <ModalCreateGroup
                isVisible={isModalCreateGroupVisible}
                onCancel={handleCancelModalCreatGroup}
                onOk={handleOklModalCreatGroup}
                loading={confirmLoading}
            />


            <ModalClassify
                isVisible={isShowModalClasify}
                onCancel={handleCancelClassifyModal}
                onOpen={handleOpenModalClassify}
            />

            <ModalAddFriend
                isVisible={isShowModalAddFriend}
                onCancel={handeCancelModalAddFriend}
                onSearch={handOnSearchUser}
                onEnter={handleOnEnter}
            />

            <UserCard
                user={userIsFind}
                isVisible={visibleUserCard}
                onCancel={handleCancelModalUserCard}
            />

        </div>
    );
}

export default SearchContainer;