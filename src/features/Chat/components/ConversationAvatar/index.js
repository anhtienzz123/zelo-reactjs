import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Tooltip } from 'antd'
import COVERSATION_STYLE from './ConversationAvatarStyle'
import './style.scss'
import DEFAULT_AVATAR from 'assets/images/user/zelo_user_default.jpg'
ConversationAvatar.propTypes = {
    demension: PropTypes.number,
    isGroupCard: PropTypes.bool,
    totalMembers: PropTypes.number.isRequired,
    type: PropTypes.bool.isRequired,
}

ConversationAvatar.defaultProps = {
    demension: 28,
    isGroupCard: false,
}

function ConversationAvatar({
    avatar,
    demension,
    isGroupCard,
    totalMembers,
    type,
}) {
    const renderAvatar = () => {
        let tempAvatar = []
        for (let index = 0; index < totalMembers; index++) {
            tempAvatar.push(
                <Avatar
                    key={index}
                    style={
                        (totalMembers === 3 && index === 2)
                            ? COVERSATION_STYLE.styleGroup3
                            : {}
                    }
                    size={demension}
                    src={avatar[index] ? avatar[index] : DEFAULT_AVATAR}
                />
            )
        }
        return tempAvatar;
    }

    return (
        <div id="avatar_conversation">
            {!type ? (
                <Avatar size={48} src={avatar ? avatar : DEFAULT_AVATAR} />
            ) : (
                <>
                    {totalMembers === 3 ? (
                        <div className="conversation-item_box">
                            <div className="left-side-box">
                                <div
                                    style={
                                        isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatar(
                                                demension
                                            )
                                            : {}
                                    }
                                    className="icon-users-group"
                                >
                                    <Avatar.Group
                                        maxCount={3}
                                        maxPopoverPlacement={false}
                                    >
                                        {renderAvatar()}
                                    </Avatar.Group>
                                </div>
                            </div>
                        </div>
                    ) : totalMembers === 2 ? (
                        <div className="conversation-item_box">
                            <div className="left-side-box">
                                <div
                                    lassName="icon-users-group"
                                    style={
                                        isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatarMixStyle2(
                                                demension
                                            )
                                            : COVERSATION_STYLE.styleGroup2
                                    }
                                >
                                    <Avatar.Group
                                        maxCount={3}
                                        maxPopoverPlacement="none"
                                        vi
                                    >
                                        {renderAvatar()}
                                    </Avatar.Group>
                                </div>
                            </div>
                        </div>
                    ) : totalMembers === 4 ? (
                        <div className="conversation-item_box">
                            <div className="left-side-box">
                                <div
                                    className="icon-users-group"
                                    style={
                                        isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatar(
                                                demension
                                            )
                                            : {}
                                    }
                                >
                                    <div id="group-many-user">
                                        <div className="per-user">
                                            <Avatar
                                                size={demension}
                                                src={
                                                    avatar
                                                        ? avatar[0]
                                                        : DEFAULT_AVATAR
                                                }
                                            />
                                        </div>

                                        <div className="per-user">
                                            <Avatar
                                                size={demension}
                                                src={
                                                    avatar
                                                        ? avatar[1]
                                                        : DEFAULT_AVATAR
                                                }
                                            />
                                        </div>

                                        <div className="per-user">
                                            <Avatar
                                                size={demension}
                                                style={{
                                                    backgroundColor: '#1890ff',
                                                }}
                                                src={
                                                    avatar
                                                        ? avatar[2]
                                                        : DEFAULT_AVATAR
                                                }
                                            />
                                        </div>
                                        <div className="per-user">
                                            <Tooltip placement="top">
                                                <Avatar
                                                    style={{
                                                        backgroundColor:
                                                            '#e8eaef',
                                                        color: '#848f9b',
                                                    }}
                                                    size={demension}
                                                >
                                                    {`+${avatar &&
                                                        avatar.length - 3
                                                        }`}
                                                </Avatar>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Avatar size={48} src={avatar[0] ? avatar[0] : DEFAULT_AVATAR} />
                    )}
                </>
            )}
        </div>
    )
}

export default ConversationAvatar
