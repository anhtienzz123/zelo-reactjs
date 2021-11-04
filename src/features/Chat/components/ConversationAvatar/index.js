import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Tooltip } from 'antd';
import COVERSATION_STYLE from './ConversationAvatarStyle';
import './style.scss';
import DEFAULT_AVATAR from 'assets/images/user/zelo_user_default.jpg';
import AvatarCustom from 'components/AvatarCustom';
ConversationAvatar.propTypes = {
    demension: PropTypes.number,
    isGroupCard: PropTypes.bool,
    totalMembers: PropTypes.number.isRequired,
    type: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    isActived: PropTypes.bool,
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    sizeAvatar: PropTypes.number,
    frameSize: PropTypes.number,
};

ConversationAvatar.defaultProps = {
    demension: 28,
    isGroupCard: false,
    isActived: false,
    avatar: '',
    sizeAvatar: 48,
    frameSize: 48,
};

function ConversationAvatar({
    avatar,
    demension,
    isGroupCard,
    totalMembers,
    type,
    name,
    isActived,
    sizeAvatar,
    frameSize,
}) {
    const renderAvatar = () => {
        let tempAvatar = [];
        for (let index = 0; index < totalMembers; index++) {
            tempAvatar.push(
                <Avatar
                    key={index}
                    style={
                        totalMembers === 3 && index === 2
                            ? COVERSATION_STYLE.styleGroup3(demension)
                            : {}
                    }
                    size={demension}
                    src={avatar[index] ? avatar[index] : DEFAULT_AVATAR}
                />
            );
        }
        return tempAvatar;
    };

    const renderGroupManyUser = () => {
        let tempAvatar = [];
        for (let index = 0; index < 4; index++) {
            if (index < 3) {
                tempAvatar.push(
                    <div className="per-user">
                        <Avatar
                            size={demension}
                            src={avatar[index] ? avatar[index] : DEFAULT_AVATAR}
                            style={
                                index == 2
                                    ? { marginTop: (demension / 6) * -1 }
                                    : {}
                            }
                        />
                    </div>
                );
            } else {
                tempAvatar.push(
                    <div className="per-user">
                        <Tooltip placement="top">
                            <Avatar
                                style={{
                                    backgroundColor: '#7562d8',
                                    color: '#fff',
                                    marginTop: (demension / 6) * -1,
                                }}
                                size={demension}
                            >
                                +{totalMembers - 3}
                            </Avatar>
                        </Tooltip>
                    </div>
                );
            }
        }
        return tempAvatar;
    };

    return (
        <div id="avatar_conversation">
            {typeof avatar === 'string' ? (
                // <Avatar size={48} src={avatar ? avatar : DEFAULT_AVATAR} />
                <Badge dot={isActived} offset={[-5, 40]} color="green">
                    <AvatarCustom size={sizeAvatar} src={avatar} name={name} />
                </Badge>
            ) : (
                <>
                    {totalMembers === 3 ? (
                        <div className="conversation-item_box">
                            <div className="left-side-box">
                                <div
                                    style={
                                        (isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatar(
                                                  demension
                                              )
                                            : {},
                                        {
                                            width: `${frameSize}px`,
                                            height: `${frameSize}px`,
                                        })
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
                                        (isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatarMixStyle2(
                                                  demension
                                              )
                                            : COVERSATION_STYLE.styleGroup2,
                                        {
                                            width: `${frameSize}px`,
                                            height: `${frameSize}px`,
                                        })
                                    }
                                >
                                    <Avatar.Group
                                        maxCount={3}
                                        maxPopoverPlacement="none"
                                    >
                                        {renderAvatar()}
                                    </Avatar.Group>
                                </div>
                            </div>
                        </div>
                    ) : totalMembers > 3 ? (
                        <div className="conversation-item_box">
                            <div className="left-side-box">
                                <div
                                    className="icon-users-group"
                                    style={
                                        (isGroupCard
                                            ? COVERSATION_STYLE.friendCardAvatar(
                                                  demension
                                              )
                                            : {},
                                        {
                                            width: `${frameSize}px`,
                                            height: `${frameSize}px`,
                                        })
                                    }
                                >
                                    <div id="group-many-user">
                                        {renderGroupManyUser()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Avatar
                                size={sizeAvatar}
                                src={avatar[0] ? avatar[0] : DEFAULT_AVATAR}
                                //     { width: `${frameSize}px`, height: `${frameSize}px` }
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ConversationAvatar;
