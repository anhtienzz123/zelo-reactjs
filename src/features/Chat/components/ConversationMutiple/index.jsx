import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
ConversationMutiple.propTypes = {
    participants: PropTypes.number,
};

ConversationMutiple.defaultProps = {
    participants: 4,
};

const styleGroup3 = {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)'
}

const styleGroup2 = {
    display: 'flex',
    alignItems: 'center',
}

function ConversationMutiple(props) {
    const { participants } = props;
    return (
        <>
            {(() => {
                if (participants === 3) {
                    return (
                        <div className='conversation-item_box'>
                            <div className="left-side-box">
                                <div className="icon-users-group">
                                    <Avatar.Group
                                        maxCount={3}
                                        size={28}
                                        maxPopoverPlacement={false}
                                    >
                                        <Avatar
                                            size={28}
                                            src="https://vnn-imgs-f.vgcloud.vn/2019/10/09/23/bo-qua-lum-xum-huong-ly-ra-mat-mv-moi.jpg"
                                        />
                                        <Avatar
                                            size={28}
                                            src='data:image/jpeg;base64,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'
                                        />

                                        <Avatar
                                            size={28}
                                            style={styleGroup3}
                                            src="https://vnn-imgs-f.vgcloud.vn/2019/10/09/23/bo-qua-lum-xum-huong-ly-ra-mat-mv-moi.jpg"
                                        />

                                    </Avatar.Group>
                                </div>
                            </div>

                            <div className="middle-side-box">
                                <span className="name-box">
                                    U30 Đồ Sơn
                                </span>

                                <div className="lastest-message">
                                    <span>Suzy: </span>
                                    <span>Em Xuân iu các</span>
                                </div>
                            </div>

                            <div className="right-side-box">
                                <span className="lastest-time">
                                    18 phút trước
                                </span>
                                <span className="message-count">
                                    10
                                </span>
                            </div>


                        </div>
                    )

                } else if (participants === 2) {
                    return (
                        <div className='conversation-item_box'>
                            <div className="left-side-box">
                                <div className="icon-users-group" style={styleGroup2}>
                                    <Avatar.Group
                                        maxCount={3}
                                        size={28}
                                        maxPopoverPlacement={false}
                                    >
                                        <Avatar
                                            size={28}
                                            src="https://vnn-imgs-f.vgcloud.vn/2019/10/09/23/bo-qua-lum-xum-huong-ly-ra-mat-mv-moi.jpg"
                                        />
                                        <Avatar
                                            size={28}
                                            src='data:image/jpeg;base64,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'
                                        />


                                    </Avatar.Group>
                                </div>
                            </div>

                            <div className="middle-side-box">
                                <span className="name-box">
                                    U30 Đồ Sơn
                                </span>

                                <div className="lastest-message">
                                    <span>Suzy: </span>
                                    <span>Em Xuân iu các </span>
                                </div>
                            </div>

                            <div className="right-side-box">
                                <span className="lastest-time">
                                    18 phút trước
                                </span>
                                <span className="message-count">
                                    10
                                </span>
                            </div>


                        </div>
                    )
                } else {
                    return (
                        <div className='conversation-item_box'>
                            <div className="left-side-box">
                                <div className="icon-users-group">
                                    <Avatar.Group
                                        maxCount={3}
                                        size={28}
                                        maxPopoverPlacement={false}
                                    >
                                        <Avatar
                                            size={28}
                                            src="https://vnn-imgs-f.vgcloud.vn/2019/10/09/23/bo-qua-lum-xum-huong-ly-ra-mat-mv-moi.jpg"
                                        />
                                        <Avatar
                                            size={28}
                                            src='data:image/jpeg;base64,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'
                                        />

                                        <Avatar
                                            size={28}
                                            style={{
                                                backgroundColor: '#1890ff',
                                            }}
                                            src="https://vnn-imgs-f.vgcloud.vn/2019/10/09/23/bo-qua-lum-xum-huong-ly-ra-mat-mv-moi.jpg"
                                        />
                                        <Avatar
                                            size={28}
                                            style={{
                                                backgroundColor: '#1890ff',
                                            }}
                                            src='data:image/jpeg;base64,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'
                                        />
                                    </Avatar.Group>
                                </div>
                            </div>

                            <div className="middle-side-box">
                                <span className="name-box">
                                    U30 Đồ Sơn
                                </span>

                                <div className="lastest-message">
                                    <span>Suzy: </span>
                                    <span>Em Xuân iu các</span>
                                </div>
                            </div>

                            <div className="right-side-box">
                                <span className="lastest-time">
                                    18 phút trước
                                </span>
                                <span className="message-count">
                                    10
                                </span>
                            </div>


                        </div>
                    )

                }
            })()}




        </>
    );
}

export default ConversationMutiple;