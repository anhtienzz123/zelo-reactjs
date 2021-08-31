import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CaretDownOutlined } from '@ant-design/icons';

ArchiveFile.propTypes = {
    viewMediaClick: PropTypes.func
};

ArchiveFile.defaultProps = {
    viewMediaClick: null
};

function ArchiveFile(props) {
    const { viewMediaClick } = props;
    const [isDrop, setIsDrop] = useState(true);
    const styleIconDrop = {

        transform: 'rotate(-90deg)'
    }

    const styleInteract = {
        maxHeight: "0px",


    }

    const handleOnClick = () => {
        setIsDrop(!isDrop);
    }

    const handleViewAllOnClick = () => {
        if (viewMediaClick) {
            viewMediaClick(2);
        }
    }


    return (
        <div className="info_file">
            <div
                className="info_file-header"
                onClick={handleOnClick}
            >
                <div className="info_file-header-title">
                    File
                </div>

                <div className="info_file-header-icon" style={isDrop ? { } : styleIconDrop}>
                    <CaretDownOutlined />
                </div>
            </div>

            <div className="info_file-interact" style={isDrop ? { } : styleInteract}>
                <div className="info_file-interact-file">
                    ádasd
                </div>

                <div className="info_file-interact-button">
                    <button onClick={handleViewAllOnClick}>
                        Xem Tất cả
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArchiveFile;