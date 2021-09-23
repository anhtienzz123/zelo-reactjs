import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import {
    AudioOutlined,
    CloseOutlined,
    ShareAltOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

ActionNavbar.propTypes = {};

function ActionNavbar(props) {
    return (
        <div
            className='action-navbar'
            style={{ width: '50%', margin: '0 auto' }}>
            <Menu mode='horizontal'>
                <Menu.Item key='toggle-video' icon={<VideoCameraOutlined />}>
                    Tắt video
                </Menu.Item>

                <Menu.Item key='toggle-audio' icon={<AudioOutlined />}>
                    Tắt audio
                </Menu.Item>

                <Menu.Item
                    key='toggle-share-screen'
                    icon={<ShareAltOutlined />}>
                    Share màn hình
                </Menu.Item>

                <Menu.Item key='close-call-video' icon={<CloseOutlined />}>
                    Kết thúc
                </Menu.Item>
            </Menu>
        </div>
    );
}

export default ActionNavbar;
