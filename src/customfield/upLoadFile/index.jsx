import { message, Upload } from 'antd';
import messageApi from 'api/messageApi';
import ACCEPT_FILE from 'constants/acceptFile';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';

UploadFile.propTypes = {
    typeOfFile: PropTypes.string,
};

UploadFile.defaultProp = {
    typeOfFile: '',
};


function UploadFile(props) {
    const { typeOfFile } = props;

    // const ACCEPT_IMG_AND_VIDEO = 'image/*,video/*';
    const { user } = useSelector(state => state.global);
    const { currentConversation } = useSelector(state => state.chat);



    const handleCustomRequest = async ({ onSuccess, onError, file, onProgress }) => {

        const fmData = new FormData();
        let typeFile

        if (typeOfFile === 'media') {
            typeFile = file.type.startsWith('image') ? 'IMAGE' : "VIDEO";
        } else {
            typeFile = 'FILE';

        }
        fmData.append("file", file);

        const attachInfo = {
            type: typeFile,
            conversationId: currentConversation
        }
        try {
            await messageApi.sendFileThroughMessage(fmData, attachInfo, (percentCompleted) => {
                console.log('value', percentCompleted);
            });
            message.success(`Đã tải lên ${file.name}`);
        } catch (e) {
            message.error(`Tải lên ${file.name} thất bại.`);
        }

    }

    return (
        <Upload
            accept={typeOfFile === 'media' ? ACCEPT_FILE.IMAGE_VIDEO : ACCEPT_FILE.FILE}
            multiple={true}
            progress
            customRequest={handleCustomRequest}
            showUploadList={false}
        >
            {props.children}
        </Upload >
    );
}

export default UploadFile;