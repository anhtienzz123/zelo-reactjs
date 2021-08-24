import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BellOutlined, CheckSquareOutlined, ContactsOutlined, MessageOutlined, SettingOutlined, StarOutlined, UserOutlined } from '@ant-design/icons';
import './style.scss';
import { Avatar, Badge } from 'antd';
NavbarContainer.propTypes = {

};

function NavbarContainer(props) {
    return (
        <div id='sidebar_wrapper'>
            <div className="user-icon">
                <Badge 
                    dot 
                    status='success'
                    offset={[-5, 40]}
                    >
                    <div className="user-icon_img">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/3/38/Melissa_Benoist_by_Gage_Skidmore.jpg"
                            alt="user"
                        />
                    </div>
                </Badge>
            </div>

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