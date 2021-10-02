import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Button, Image, Input, Modal } from 'antd';
import UserCardStyle from './UserCardStyle';
import FriendUtils from 'utils/friendUtils';
import { useSelector } from 'react-redux';
import dateUtils from 'utils/dateUtils';
import { DeleteFilled } from '@ant-design/icons';
UserCard.propTypes = {
    title: PropTypes.string,
    user: PropTypes.object.isRequired,
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    onAddFriend: PropTypes.func,
};

UserCard.defaultProps = {
    title: 'Thông tin',
    onCancel: null,
    onAddFriend: null,

    // coverImage: 'https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg',
    // avatar: 'https://splynt.co/wp-content/uploads/2021/02/blank-profile.jpg'
};


function UserCard(props) {
    const { title, isVisible, user, onCancel, onAddFriend } = props;
    const { friends } = useSelector(state => state.chat);
    const { requestFriends } = useSelector(state => state.friend);
    const [isShowButton, setIsShowButton] = useState(true);
    const [isShowButtonComfirm, setIsShowButtonConfirm] = useState(false);
    // const [isShowButtonCancel, setIsShowButtonCancel] = useState(false);

    useEffect(() => {
        setIsShowButton(!FriendUtils.checkIsFriend(user, friends));
        setIsShowButtonConfirm(FriendUtils.checkIsSentRequest(user, requestFriends));
        // setIsShowButtonCancel(FriendUtils.checkIsMyRequestFriend(user, friends));

        console.log(user, FriendUtils.checkIsSentRequest(user, requestFriends));
    }, [user]);


    const handleOnCancle = () => {
        if (onCancel) {
            onCancel();
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





    const coverImage = 'https://miro.medium.com/max/1124/1*92adf06PCF91kCYu1nPLQg.jpeg';
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
                            style={UserCardStyle.CoverImageStyle}
                        />

                        <div className="user-card_avatar">
                            <Image
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
                            (isShowButton && !isShowButtonComfirm) &&
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
                            // user-card-button--no-margin
                        }

                        {isShowButtonComfirm &&
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




                        <div className={`user-card-button--message ${!isShowButton ? 'user-card-button--no-margin' : ''}`}>
                            <Button
                                type="default"
                                style={isShowButtonComfirm ? UserCardStyle.buttonStyle_2 : UserCardStyle.buttonStyle_1}
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


                    <div className={`user-card-button-optional ${isShowButton ? 'user-card-button-optional--hidden' : ''}`}>
                        <Button
                            danger
                            icon={<DeleteFilled />}
                            style={UserCardStyle.buttonFullSize}
                            size='large'
                        >
                            Xóa
                        </Button>
                    </div>

                </div>
            </div>

        </Modal>

    );
}

export default UserCard;