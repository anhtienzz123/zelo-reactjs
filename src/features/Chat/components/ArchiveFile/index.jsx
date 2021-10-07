import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { CaretDownOutlined } from '@ant-design/icons';
import { FileIcon, defaultStyles } from 'react-file-icon';
import fileHelpers from 'utils/fileHelpers';
import { Row, Col } from 'antd';

ArchiveFile.propTypes = {
    viewMediaClick: PropTypes.func,
    items: PropTypes.array,
};

ArchiveFile.defaultProps = {
    viewMediaClick: null,
    items: [],
};

function ArchiveFile(props) {
    const { viewMediaClick, items } = props;
    const [isDrop, setIsDrop] = useState(true);
    const styleIconDrop = {
        transform: 'rotate(-90deg)',
    };

    const styleInteract = {
        maxHeight: '0px',
    };

    const handleOnClick = () => {
        setIsDrop(!isDrop);
    };

    const handleViewAllOnClick = () => {
        if (viewMediaClick) {
            viewMediaClick(2);
        }
    };

    const handleItemClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div className='info_file'>
            <div className='info_file-header' onClick={handleOnClick}>
                <div className='info_file-header-title'>File</div>

                <div
                    className='info_file-header-icon'
                    style={isDrop ? {} : styleIconDrop}>
                    <CaretDownOutlined />
                </div>
            </div>

            <div
                className='info_file-interact'
                style={isDrop ? {} : styleInteract}>
                <div className='info_file-interact-file'>
                    {items.map((itemEle, index) => {
                        const fileName = fileHelpers.getFileName(
                            itemEle.content
                        );
                        const fileExtension =
                            fileHelpers.getFileExtension(fileName);
                        return (
                            <div
                                key={index}
                                style={{ width: '48px' }}
                                onClick={() =>
                                    handleItemClick(itemEle.content)
                                }>
                                <Row>
                                    <Col span={16}>
                                        <FileIcon
                                            extension={fileExtension}
                                            {...defaultStyles[fileExtension]}
                                        />{' '}
                                    </Col>

                                    <Col span={8}>{fileName}</Col>
                                </Row>
                            </div>
                        );
                    })}
                </div>

                <div className='info_file-interact-button'>
                    <button onClick={handleViewAllOnClick}>Xem Tất cả</button>
                </div>
            </div>
        </div>
    );
}

export default ArchiveFile;
