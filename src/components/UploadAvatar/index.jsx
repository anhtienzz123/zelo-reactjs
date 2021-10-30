import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CameraOutlined } from '@ant-design/icons';


UploadAvatar.propTypes = {

};

function UploadAvatar(props) {
    return (
        <div id='upload-avatar'>
            <div className="upload-avatar_default-avatar">
                <div className="upload-avatar_image">
                    <img
                        src="https://cdn.phunuvagiadinh.vn/ngocly/quang-cao-sam-mung-sinh-nhat-jisoo-blackpink-7.jpg"
                        alt=""
                    />

                </div>


                <div className="upload-avatar_icon">
                    <label htmlFor="upload-photo_custom">
                        <CameraOutlined style={{ fontSize: '13px' }} />
                    </label>
                    <input id="upload-photo_custom" type="file" hidden />
                </div>

            </div>

        </div>
    );
}

export default UploadAvatar;