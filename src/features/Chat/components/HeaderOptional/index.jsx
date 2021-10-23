import {
    SearchOutlined,
    SplitCellsOutlined,
    TagOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import conversationApi from 'api/conversationApi';
import { createGroup } from 'features/Chat/slice/chatSlice';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dateUtils from 'utils/dateUtils';
import ConversationAvatar from '../ConversationAvatar';
import ModalAddMemberToConver from '../ModalAddMemberToConver';
import './style.scss';

HeaderOptional.propTypes = {
    avatar: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,

    ]),
    totalMembers: PropTypes.number,
    name: PropTypes.string,
    typeConver: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool,
    lastLogin: PropTypes.object,
};

HeaderOptional.defaultProps = {
    totalMembers: 0,
    name: '',
    isLogin: false,
    lastLogin: null,

};

function HeaderOptional(props) {
    const { avatar, totalMembers, name, typeConver, isLogin, lastLogin } = props;
    const type = typeof avatar;
    const { currentConversation } = useSelector((state) => state.chat);
    const [isVisible, setIsvisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [typeModal, setTypeModal] = useState(1);
    const dispatch = useDispatch();

    // false đơn, true là nhóm
    const handleAddMemberToGroup = () => {
        setIsvisible(true);
        if (typeConver) {
            setTypeModal(2);
        } else {
            setTypeModal(1);
        }
    };

    const handleOk = async (userIds, name) => {
        if (typeModal === 1) {
            setConfirmLoading(true);
            dispatch(
                createGroup({
                    name,
                    userIds,
                })
            );
            setConfirmLoading(false);
        } else {
            // socket (đối với user đc add): io.emit('added-group', conversationId).
            setConfirmLoading(true);
            await conversationApi.addMembersToConver(
                userIds,
                currentConversation
            );
            setConfirmLoading(false);
        }

        setIsvisible(false);
    };

    const hanleOnCancel = (value) => {
        setIsvisible(value);
    };

    const checkTime = () => {
        if (lastLogin) {
            const time = dateUtils.toTime(lastLogin);
            if (lastLogin.indexOf('ngày') || lastLogin.indexOf('giờ') || lastLogin.indexOf('phút')) {
                return true;
            }
            return false
        }
    }

    console.log('avatar', avatar);

    return (
        <div id='header-optional'>
            <div className='header_wrapper'>
                <div className='header_leftside'>
                    <div className='icon_user'>
                        {<ConversationAvatar
                            avatar={avatar}
                            totalMembers={totalMembers}
                            type={typeConver}
                        />}
                    </div>

                    <div className='info_user'>
                        <div className='info_user-name'>
                            <span>{name}</span>
                        </div>

                        <div className='lastime-access'>
                            {typeConver ? (
                                <div className='member-hover'>
                                    <UserOutlined />
                                    &nbsp;{totalMembers}
                                    <span>&nbsp;Thành viên</span>
                                </div>
                            ) : (
                                <>
                                    {
                                        isLogin ? (
                                            <span>Đang hoạt động</span>
                                        ) : (
                                            <span>{`Truy cập ${dateUtils.toTime(lastLogin).toLowerCase()}`} {`${checkTime() ? 'trước' : ''}`} </span>
                                        )
                                    }
                                </>
                            )}
                            <div className='small-bar'></div>
                            <div className='classify-object'>
                                <TagOutlined />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='header_rightside'>
                    <div
                        className='icon-header create-group'
                        onClick={handleAddMemberToGroup}>
                        <UsergroupAddOutlined />
                    </div>

                    <div className='icon-header search-message'>
                        <SearchOutlined />
                    </div>

                    <div className='icon-header call-video'>
                        <VideoCameraOutlined />
                    </div>

                    <div className='icon-header pop-up-layout'>
                        <SplitCellsOutlined />
                    </div>


                </div>
            </div>

            <ModalAddMemberToConver
                isVisible={isVisible}
                onCancel={hanleOnCancel}
                onOk={handleOk}
                loading={confirmLoading}
                typeModal={typeModal}
            />
        </div>
    );
}

export default HeaderOptional;
