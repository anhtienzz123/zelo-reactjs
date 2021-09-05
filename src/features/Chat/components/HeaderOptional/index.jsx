import { SearchOutlined, SplitCellsOutlined, TagOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import PersonalIcon from '../PersonalIcon';
import ThumbnailMutiple from '../ThumbnailMutiple';
import ConversationAvatar from '../ConversationAvatar';
import './style.scss';
HeaderOptional.propTypes = {
    avatar: PropTypes.array || PropTypes.string,
    totalMembers: PropTypes.number,
    name: PropTypes.string,
};

HeaderOptional.defaultProps = {
    avatar: [] || "",
    totalMembers: 0,
    name: ''
};

function HeaderOptional(props) {
    const { avatar, totalMembers, name } = props;
    const type = typeof avatar;
    return (
        <div id='header-optional'>
            <div className="header_wrapper">
                <div className="header_leftside">
                    <div className='icon_user'>

                        {<ConversationAvatar avatar={avatar} />}
                    </div>

                    <div className="info_user">
                        <div className="info_user-name">
                            <span>{name}</span>
                        </div>

                        <div className="lastime-access">
                            {
                                totalMembers > 2
                                    ? (
                                        <div className="member-hover">
                                            <UserOutlined />&nbsp;{totalMembers}<span >&nbsp;Thành viên</span>
                                        </div>)
                                    : (<span>Vừa truy cập</span>)
                            }
                            <div className='small-bar'></div>
                            <div className='classify-object'>
                                <TagOutlined />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="header_rightside">
                    <div className='create-group'>
                        <UsergroupAddOutlined />
                    </div>
                    <div className="search-message">
                        <SearchOutlined />
                    </div>
                    <div className="pop-up-layout">
                        <SplitCellsOutlined />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderOptional;