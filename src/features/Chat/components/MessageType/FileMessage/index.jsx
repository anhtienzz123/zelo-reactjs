import React from 'react';
import PropTypes from 'prop-types';
import { DownloadOutlined } from '@ant-design/icons';
import fileHelpers from 'utils/fileHelpers';
import { FileIcon, defaultStyles } from 'react-file-icon';
import './style.scss';
FileMessage.propTypes = {
    content: PropTypes.string.isRequired,
    isVisibleTime: PropTypes.bool.isRequired,
    dateAt: PropTypes.object.isRequired,
};

FileMessage.defaultProps = {


};
// {content}
function FileMessage({ content, children, dateAt, isVisibleTime }) {

    const handleOnClickDownLoad = () => {
        window.open(content, '_blank');
    };

    const handleOnClickShare = () => {

    }

    const fileName = fileHelpers.getFileName(content);
    const fileExtension =
        fileHelpers.getFileExtension(fileName);


    // console.log('content', content);
    // console.log('fileName', fileName);
    // console.log('fileExtension', fileExtension);




    return (
        <>
            <div className='file_info-wrapper'>
                <div className="file_info">
                    <div className="file_info-icon">
                        <FileIcon
                            extension={fileExtension}
                            {...defaultStyles[fileExtension]}
                        />
                    </div>

                    <div className="file_info-name">
                        {fileName}
                    </div>
                </div>

                <div className="icon-download" onClick={handleOnClickDownLoad}>
                    <DownloadOutlined />
                </div>

            </div>

            {
                isVisibleTime &&
                (
                    <div className="time-send">
                        <span>
                            {`0${dateAt.getHours()}`.slice(
                                -2
                            )}
                            :
                            {`0${dateAt.getMinutes()}`.slice(
                                -2
                            )}
                        </span>
                    </div>
                )
            }

            {children}
        </>
    );
}

export default FileMessage;