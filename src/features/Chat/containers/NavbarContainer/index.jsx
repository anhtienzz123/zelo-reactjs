import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BellOutlined, CheckSquareOutlined, ContactsOutlined, MessageOutlined, SettingOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import './style.scss';
import { Avatar, Badge } from 'antd';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
NavbarContainer.propTypes = {

};

function NavbarContainer(props) {
    return (
        <div id='sidebar_wrapper'>
            {/* <div className="user-icon"> */}
            <PersonalIcon isActive={true} common={false} />
            {/* </div> */}

            <div className="sidebar-main">
                <ul className="sidebar_nav">
                    <li className="sidebar_nav_item">
                        <Link>
                            <div className='sidebar_nav_item--icon'>

                                <Badge count={5}>
                                    <MessageOutlined />
                                </Badge>

                            </div>
                        </Link>
                    </li>

                    <li className="sidebar_nav_item">
                        <Link>
                            <div className='sidebar_nav_item--icon'>

                                <Badge count={5}>
                                    <ContactsOutlined />

                                </Badge>

                            </div>
                        </Link>
                    </li>

                    <li className="sidebar_nav_item">
                        <Link>
                            <div className='sidebar_nav_item--icon'>

                                <Badge count={5}>
                                    <BellOutlined />
                                </Badge>

                            </div>
                        </Link>
                    </li>

                    <li className="sidebar_nav_item">
                        <Link>
                            <div className='sidebar_nav_item--icon'>
                                <CheckSquareOutlined />
                            </div>
                        </Link>
                    </li>


                </ul>


                <ul className="sidebar_nav">
                    <li className="sidebar_nav_item">
                        <Link>
                            <div className='sidebar_nav_item--icon'>

                                <Badge count={0}>
                                    <SettingOutlined />
                                </Badge>

                            </div>
                        </Link>
                    </li>


                    <li className="sidebar_nav_item">
                        <Link>
                            <div className='sidebar_nav_item--icon'>

                                <Badge count={0}>
                                    <StarOutlined />
                                </Badge>

                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavbarContainer;