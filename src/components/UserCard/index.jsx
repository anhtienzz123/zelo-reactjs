import { UserDeleteOutlined } from '@ant-design/icons';
import { Button, Image, Modal } from 'antd';
import conversationApi from 'api/conversationApi';
import {
    fetchListMessages, setConversations, setCurrentConversation
} from 'features/Chat/slice/chatSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import dateUtils from 'utils/dateUtils';
import DEFAULT_AVATAR from 'assets/images/user/zelo_user_default.jpg'
import './style.scss';
import UserCardStyle from './UserCardStyle';
UserCard.propTypes = {
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onAddFriend: PropTypes.func,
    onDeleteFriend: PropTypes.func,

};

UserCard.defaultProps = {
    title: 'Thông tin',
    onCancel: null,
    onAddFriend: null,
    onDeleteFriend: null,

};


function UserCard(props) {
    const {
        title,
        isVisible,
        user, onCancel,
        onAddFriend,
        onDeleteFriend,
    } = props;

    const coverImage = 'https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg';
    const dispatch = useDispatch();
    const history = useHistory();
    const { status } = user;


    const handleClickMessage = async () => {
        const response = await conversationApi.createConversationIndividual(user._id);
        const { _id, isExists } = response;


        if (!isExists) {
            const conver = await conversationApi.getConversationById(_id);
            dispatch(setConversations(conver));
        }

        dispatch(fetchListMessages({ conversationId: _id, size: 10 }));
        dispatch(setCurrentConversation(_id));

        history.push({
            pathname: '/chat',
        });

        if (onCancel) {
            onCancel();
        }
    }

    const handleOnCancle = () => {
        if (onCancel) {
            onCancel();
        }
    }

    const handleDeleteFriend = () => {
        if (onDeleteFriend) {
            onDeleteFriend(user._id);
        }
    }

    const handleAddFriend = () => {
        if (onAddFriend) {
            onAddFriend(user._id);
        }
    }

    const handleConfirmFriend = () => {

    }

    const handleDenyRequest = () => {

    }

    return (
        <Modal
            title={title}
            visible={isVisible}
            onCancel={handleOnCancle}
            footer={null}
            width={360}
            bodyStyle={UserCardStyle.styleModal}

        >
            <div id="user-card">
                <div className="user-card_wrapper">
                    <div className="user-card_cover-image">
                        <Image
                            src={coverImage}
                            preview={false}
                            style={UserCardStyle.CoverImageStyle}
                        />

                        <div className="user-card_avatar">
                            <Image
                                fallback={DEFAULT_AVATAR}
                                src={user.avatar}
                                style={UserCardStyle.avatarStyle}
                            />
                        </div>
                    </div>

                    <div className="user-card-name">
                        {user.name}
                    </div>

                    <div className="user-card-button">
                        {

                            (status === 'NOT_FRIEND') &&
                            (
                                <div className="user-card-button--addFriend" onClick={handleAddFriend}>
                                    <Button
                                        type="primary"
                                        style={{ width: '124px' }}
                                    >
                                        Kết bạn
                                    </Button>
                                </div>
                            )
                        }


                        {(status === 'FOLLOWER') &&
                            <>
                                <div className="user-card-button--message confirm--friend" onClick={handleConfirmFriend}>
                                    <Button
                                        type="primary"
                                        style={{ maxWidth: '110px' }}
                                    >
                                        Đồng ý
                                    </Button>
                                </div>

                                <div className="user-card-button--message  confirm-deny--friend" onClick={handleDenyRequest}>
                                    <Button
                                        type="danger"
                                        style={{ maxWidth: '110px' }}
                                    >
                                        Từ chối
                                    </Button>
                                </div>
                            </>
                        }



                        {(status === 'YOU_FOLLOW') &&
                            <>
                                <div className="user-card-button--message ">
                                    <Button
                                        type="danger"
                                        style={{ width: '124px' }}
                                    >
                                        Hủy yêu cầu
                                    </Button>
                                </div>
                            </>
                        }




                        <div className={`user-card-button--message ${(status === 'FRIEND') ? 'user-card-button--no-margin' : ''}`}>
                            <Button
                                onClick={handleClickMessage}
                                type="default"
                                style={(status === 'FOLLOWER') ? UserCardStyle.buttonStyle_2 : UserCardStyle.buttonStyle_1}
                            >Nhắn tin
                            </Button>
                        </div>

                    </div>

                    <div className="user-card-infomation">
                        <div className="user-card-infomation__group user-card-infomation--flex">
                            <div className="user-card-infomation__label">
                                Nhóm chung
                            </div>

                            <div className="user-card-infomation__text">
                                2 nhóm
                            </div>
                        </div>

                        <div className="user-card-infomation__gender user-card-infomation--flex">
                            <div className="user-card-infomation__label">
                                Giới tính
                            </div>

                            <div className="user-card-infomation__text">
                                {user.gender ? 'Nam' : 'Nữ'}
                            </div>
                        </div>

                        <div className="user-card-infomation__birthday user-card-infomation--flex">
                            <div className="user-card-infomation__label">
                                Ngày sinh
                            </div>

                            <div className="user-card-infomation__text">

                                {dateUtils.transferDateString(user.dateOfBirth?.day, user.dateOfBirth?.month, user.dateOfBirth?.year)}
                            </div>
                        </div>
                    </div>


                    <div className={`user-card-button-optional ${!(status === 'FRIEND') ? 'user-card-button-optional--hidden' : ''}`}>
                        <Button
                            danger
                            icon={<UserDeleteOutlined />}
                            style={UserCardStyle.buttonFullSize}
                            size='large'
                            onClick={handleDeleteFriend}
                        >
                            Hủy kết bạn
                        </Button>
                    </div>

                </div>
            </div>

        </Modal>

    );
}

export default UserCard;