import { EditOutlined, FileImageOutlined, FileOutlined, PlaySquareOutlined, PushpinOutlined, SmileOutlined, UserAddOutlined, UserDeleteOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
ShortMessage.propTypes = {
    message: PropTypes.object,
    type: PropTypes.bool,
};

ShortMessage.defaultProps = {
    message: {},
    type: PropTypes.bool,
};



function ShortMessage({ message, type }) {
    const { user } = useSelector(state => state.global);
    const { content, isDeleted } = message;


    // useEffect(() => {
    //     if(isDeleted)Ơ
    // }, [message])


    const renderName = () => {

        if (type) {
            if (message.user._id === user._id) {
                return 'Bạn: '
            } else {
                return message.user.name + ": ";
            }

        } else {
            if (message.user._id === user._id) {
                return 'Bạn: '
            } else {
                return '';
            }
        }


    }




    return (
        <>

            {
                isDeleted ? (
                    <span>{renderName()} đã thu hồi một tin nhắn</span>
                ) : (
                    <>
                        {
                            message.type === 'TEXT' && (
                                <span>{renderName()}{content}</span>
                            )
                        }

                        {
                            message.type === 'HTML' && (
                                <span>{renderName()}đã gửi một văn bản</span>
                            )
                        }

                        {
                            message.type === 'IMAGE' && (
                                <span>{renderName()}<FileImageOutlined />&nbsp;đã gửi một hình ảnh</span>
                            )
                        }

                        {
                            message.type === 'VIDEO' && (
                                <span>{renderName()}<PlaySquareOutlined />&nbsp;đã gửi một Video</span>
                            )
                        }

                        {
                            message.type === 'FILE' && (
                                <span>{renderName()}<FileOutlined />&nbsp;đã gửi một tệp</span>
                            )
                        }

                        {
                            (message.type === 'NOTIFY' && (message.content === 'PIN_MESSAGE')) && (
                                <span>{renderName()}<PushpinOutlined />&nbsp;đã ghim một tin nhắn</span>
                            )
                        }

                        {
                            (message.type === 'NOTIFY' && (message.content === 'NOT_PIN_MESSAGE')) && (
                                <span>{renderName()}<PushpinOutlined />&nbsp;đã ghim bỏ ghim một tin nhắn</span>
                            )
                        }

                        {
                            (message.type === 'NOTIFY' && (message.content === 'Đã thêm vào nhóm')) && (
                                <span>{renderName()}<UserAddOutlined />&nbsp;đã thêm thành viên vào nhóm</span>
                            )
                        }

                        {
                            (message.type === 'NOTIFY' && (message.content === 'Đã xóa ra khỏi nhóm')) && (
                                <span>{renderName()}<UserDeleteOutlined />&nbsp;đã xóa thành viên ra khỏi nhóm</span>
                            )
                        }


                        {
                            (message.type === 'NOTIFY' && (message.content === 'Đã rời khỏi nhóm')) && (
                                <span>{renderName()}đã rời khỏi nhóm</span>
                            )
                        }

                        {
                            (message.type === 'NOTIFY' && (message.content.startsWith('Đã đổi tên nhóm thành'))) && (
                                <span>{renderName()}<EditOutlined />&nbsp;đã đổi tên nhóm thành</span>
                            )
                        }

                        {
                            (message.type === 'NOTIFY' && (message.content.startsWith('Đã là bạn bè'))) && (
                                <span>{renderName()}<UserOutlined />&nbsp;đã trở thành bạn bè</span>
                            )
                        }

                        {
                            (message.type === 'STICKER') && (
                                <span>{renderName()}<SmileOutlined />&nbsp;đã gửi một sticker</span>
                            )
                        }

                    </>
                )
            }




        </>
    );
}

export default ShortMessage;