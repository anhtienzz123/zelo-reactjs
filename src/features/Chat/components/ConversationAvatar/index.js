import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Tooltip } from 'antd';
import './style.scss';
ConversationAvatar.propTypes = {
    avatar: PropTypes.array || PropTypes.string,
    demension: PropTypes.number,

};

ConversationAvatar.defaultProps = {
    avatar: [] || "",
    demension: 28,
};

ConversationAvatar.defaultProps = {};

const styleGroup3 = {
    position: 'relative',
    left: '50%',
    transform: 'translateX(-50%)'
}

const styleGroup2 = {
    display: 'flex',
    alignItems: 'center',
}

function ConversationAvatar({ avatar, demension }) {
    const typeOf = typeof avatar;
    const quantity = typeof avatar === 'object' && avatar.length;


    const renderAvatar = () => avatar.map((avatarEle, index) => (
        <Avatar key={index} style={quantity === 3 && index === 2 ? styleGroup3 : {}} size={demension} src={avatarEle} />
    ));






    return (
        <div id='avatar_conversation'>
            {typeOf === 'string' ? (
                <Avatar size={48} src={avatar} />
            ) : (
                <>

                    {


                        quantity === 3 ? (
                            <div className='conversation-item_box'>
                                <div className="left-side-box">
                                    <div className="icon-users-group">
                                        <Avatar.Group
                                            maxCount={3}
                                            size={28}
                                            maxPopoverPlacement={false}
                                        >
                                            {renderAvatar()}

                                        </Avatar.Group>
                                    </div>
                                </div>


                            </div>
                        ) : quantity === 2 ? (
                            <div className='conversation-item_box'>
                                <div className="left-side-box">
                                    <div className="icon-users-group" style={styleGroup2}>
                                        <Avatar.Group
                                            maxCount={3}
                                            size={28}
                                            maxPopoverPlacement='none'
                                            vi
                                        >
                                            {renderAvatar()}


                                        </Avatar.Group>
                                    </div>
                                </div>


                            </div>
                        ) : (
                            <div className='conversation-item_box'>
                                <div className="left-side-box">
                                    <div className="icon-users-group">
                                        <div id='group-many-user'>

                                            <div className='per-user'>
                                                <Avatar
                                                    size={28}
                                                    src={avatar && avatar[0]}
                                                />
                                            </div>

                                            <div className='per-user'>
                                                <Avatar
                                                    size={28}
                                                    src={avatar && avatar[1]} />
                                            </div>

                                            <div className='per-user'>
                                                <Avatar
                                                    size={28}
                                                    style={{
                                                        backgroundColor: '#1890ff',
                                                    }}
                                                    src={avatar && avatar[2]} />
                                            </div>
                                            <div className='per-user'>
                                                <Tooltip placement="top">
                                                    <Avatar
                                                        style={{
                                                            backgroundColor: '#e8eaef',
                                                            color: '#848f9b'
                                                        }}
                                                        size={28}

                                                    >
                                                        {`+${avatar && avatar.length - 3}`}
                                                    </Avatar>
                                                </Tooltip>
                                            </div>


                                        </div>
                                    </div>
                                </div>



                            </div>
                        )
                    }




                </>
            )}
        </div>
    );
}

export default ConversationAvatar;
