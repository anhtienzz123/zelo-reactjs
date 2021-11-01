import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CameraOutlined } from '@ant-design/icons';
import { useEffect } from 'react';


UploadAvatar.propTypes = {
    avatar: PropTypes.string,
    getFile: PropTypes.func,
    clearData: PropTypes.func,
    isClear: PropTypes.bool,


};

UploadAvatar.defaultProps = {
    getFile: null,
    avatar: '',
    clearData: null,
    isClear: false

};

function UploadAvatar({ avatar, getFile, isClear }) {

    const [imagePreview, setImagePreview] = useState("");


    useEffect(() => {
        if (isClear) {
            setImagePreview('');
        }
    }, [isClear])

    const handleOnChange = (e) => {
        const files = e.target.files;

        const fileImage = files[0];
        const reader = new FileReader();
        if (fileImage && fileImage.type.match('image.*')) {

            reader.readAsDataURL(fileImage);
            reader.onloadend = function (e) {
                setImagePreview(reader.result);
            };

            if (getFile) {
                getFile(fileImage)
            }

        }
    }

    return (
        <div id='upload-avatar'>
            <div className="upload-avatar_default-avatar">
                <div className="upload-avatar_image">
                    {(avatar || imagePreview) ? (
                        <img
                            src={imagePreview ? imagePreview : avatar}
                            alt=""
                        />
                    ) : (
                        <label className='upload-avatar_text-select' htmlFor="upload-photo_custom">Chọn hình ảnh</label>
                    )}

                </div>

                <div className="upload-avatar_icon">
                    <label htmlFor="upload-photo_custom">
                        <CameraOutlined style={{ fontSize: '13px' }} />
                    </label>
                    <input
                        id="upload-photo_custom"
                        type="file"
                        hidden
                        onChange={handleOnChange}
                        accept="image/*"
                    />
                </div>

            </div>


        </div>
    );
}

export default UploadAvatar;