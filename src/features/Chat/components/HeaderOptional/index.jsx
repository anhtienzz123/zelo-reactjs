import { SearchOutlined, SplitCellsOutlined, TagOutlined, UsergroupAddOutlined, UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import PersonalIcon from '../PersonalIcon';
import ThumbnailMutiple from '../ThumbnailMutiple';
import './style.scss';
HeaderOptional.propTypes = {
    group: PropTypes.bool,
    members: PropTypes.number,
};

HeaderOptional.defaultProps = {
    group: false,
    members: 2,
};

function HeaderOptional(props) {
    const { group, members } = props;
    return (
        <div id='header-optional'>
            <div className="header_wrapper">
                <div className="header_leftside">
                    <div className='icon_user'>
                        {(() => {
                            if (!group) {
                                return (<ThumbnailMutiple participants={members} />)

                            } else {
                                return (<PersonalIcon isActive={false}  />);
                            }
                        })()}
                    </div>

                    <div className="info_user">
                        <div className="info_user-name">
                            <span>Nancy</span>
                        </div>

                        <div className="lastime-access">
                            {
                                group
                                    ? (
                                        <div className="member-hover">
                                            <UserOutlined />&nbsp;101<span >&nbsp;Thành viên</span>
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