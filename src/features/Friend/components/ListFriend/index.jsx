import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import FriendItem from '../FriendItem';
import friendApi from 'api/friendApi';
import { fetchFriends } from '../../friendSlice';
import './style.scss';
import UserCard from 'components/UserCard';

ListFriend.propTypes = {
    data: PropTypes.array,
};

ListFriend.defaultProps = {
    data: [],
};




function ListFriend({ data }) {

    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [userIsFind, setUserIsFind] = useState({})

    const handleOnClickMenu = (key, id) => {
        if (key === "2") {
            confirm(id);
        } else {
            setIsVisible(true);
            setUserIsFind(data.find(ele => ele._id === id));
        }
    }

    const handleCancelModalUserCard = () => {
        setIsVisible(false)
    }

    const handleOkModal = async (id) => {
        try {
            await friendApi.deleteFriend(id);
            dispatch(fetchFriends({ name: '' }))
            message.success('Xóa thành công');
            setIsVisible(false);
        } catch (error) {
            message.error('Xóa thất bại');
        }
    }

    const handleOnDeleteFriend = (id) => {
        setIsVisible(true);
        confirm(id);

    }



    function confirm(id) {
        Modal.confirm({
            title: 'Xác nhận',
            icon: <ExclamationCircleOutlined />,
            content: <span>Bạn có thực sự muốn xóa <b>{data.find(ele => ele._id === id).name}</b> khỏi danh sách bạn bè </span>,
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => handleOkModal(id),

        });
    }


    return (

        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
            style={{ 'height': '100%', 'width': '100%' }}

        >

            {
                data.length > 0 &&
                data.map((ele, index) => (
                    <FriendItem
                        key={index}
                        data={ele}
                        onClickMenu={handleOnClickMenu}
                    />
                ))
            }

            <UserCard
                user={userIsFind}
                isVisible={isVisible}
                onCancel={handleCancelModalUserCard}
                isMyFriend={true}
                onDeleteFriend={handleOnDeleteFriend}
            />



        </Scrollbars>

    );
}

export default ListFriend;