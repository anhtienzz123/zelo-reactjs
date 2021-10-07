import React from 'react';
import PropTypes from 'prop-types';
import { FileIcon, defaultStyles } from 'react-file-icon';
import fileHelpers from 'utils/fileHelpers';
import { Row, Col } from 'antd';

ContentTabPaneFile.propTypes = {
    items: PropTypes.array,
};

ContentTabPaneFile.defaultProps = {
    items: [],
};

function ContentTabPaneFile(props) {
    const { items } = props;

    const handleItemClick = (url) => {
        window.open(url, '_blank');
    };

    return (
        <div>
            {items.map((itemEle, index) => {
                const fileName = fileHelpers.getFileName(itemEle.content);
                const fileExtension = fileHelpers.getFileExtension(fileName);
                return (
                    <div
                        key={index}
                        style={{ width: '48px' }}
                        onClick={() => handleItemClick(itemEle.content)}>
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
    );
}

export default ContentTabPaneFile;
