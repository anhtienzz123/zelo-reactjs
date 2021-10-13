import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, message } from 'antd';
import commonFuc from 'utils/commonFuc';
import messageApi from 'api/messageApi';
import { useSelector } from 'react-redux';

UploadFile.propTypes = {
    type: PropTypes.string,
};

UploadFile.defaultProp = {
    type: '',
};


function UploadFile(props) {
    const { type } = props;

    const ACCEPT_IMG_AND_VIDEO = 'image/*,video/*';
    const [fileList, setFileList] = useState([]);
    const { user } = useSelector(state => state.global);
    const { currentConversation } = useSelector(state => state.chat);



    const handleChange = async (info) => {



    };




    const handleAction = (file) => {


    };

    const handleCustomRequest = async ({ onSuccess, onError, file, onProgress }) => {

        // const { uid, name, type } = file;
        // console.log({ onSuccess, onError, file, onProgress });
        const fmData = new FormData();
        // const typeFile = file.type.startsWith('image') ? true : false;
        let typeFile;

        if (type === 'Image') {
            typeFile = file.type.startsWith('image') ? 'IMAGE' : "VIDEO";
        } else {
            typeFile = 'FILE'
        }


        // tempFile.type = 'rar';
        // console.log('tempFile', { uid, name, type });

        fmData.append("file", file);
        // const newFile = { ...file };
        // file.type = 'rar';
        // console.log(file);
        // fmData.append("file", newFile);
        // console.log(newFile);

        const attachInfo = {
            type: typeFile,
            conversationId: currentConversation
        }
        try {

            const result = await messageApi.sendFileThroughMessage(fmData, attachInfo, (percentCompleted) => {
                console.log('value', percentCompleted);
            });

            message.success(`${file.name} file uploaded successfully`);
        } catch (e) {
            message.error(`${file.name} file upload failed.`);
        }

    }

    return (
        <Upload
            accept={type === 'Image' ? ACCEPT_IMG_AND_VIDEO : ''}
            action={handleAction}
            fileList={fileList}
            onChange={handleChange}
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