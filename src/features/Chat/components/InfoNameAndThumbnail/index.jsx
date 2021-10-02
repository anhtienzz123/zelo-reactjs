import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ThumbnailMutiple from '../ThumbnailMutiple';
import { EditOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

InfoNameAndThumbnail.propTypes = {

};

function InfoNameAndThumbnail(props) {

    function handleClick(e) {
        console.log('click', e);
    }
    const { SubMenu } = Menu;
    return (
        <div className='info_name-and-thumbnail'>
            <div className="info-thumbnail">
                <ThumbnailMutiple participants={4} />
            </div>

            <div className="info-name-and-button">
                <div className='info-name'>
                    <span>Lái máy bay đồ sơn</span>
                </div>

                <div className='info-button'>
                    <EditOutlined />
                </div>

            </div>

        </div>
    );
}

export default InfoNameAndThumbnail;