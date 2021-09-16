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

        // console.log("chay file")

        // const { file, fileList } = info;


        // if (info.file.status !== 'uploading') {
        //     console.log(info.file, info.fileList);
        // }
        // if (info.file.status === 'done') {
        //     message.success(`${info.file.name} file uploaded successfully`);

        // } else if (info.file.status === 'error') {
        //     message.error(`${info.file.name} file upload failed.`);
        // }

        // setFileList(fileList);


        // const { file, fileList } = info;

        // if (!file.url && !file.preview) {
        //     file.preview = await commonFuc.getBase64(file.originFileObj);
        // }
        // // console.log({ info });
        // const lastItem = fileList.length - 1;
        // setFileList([{ ...fileList[lastItem], status: "done" }]);



    };

    // console.log(fileList);



    const handleAction = (file) => {

        // console.log("chay action", file);

    };

    const handleCustomRequest = async ({ onSuccess, onError, file, onProgress }) => {
        console.log({ onSuccess, onError, file, onProgress });
        const fmData = new FormData();
        // const typeFile = file.type.startsWith('image') ? true : false;
        let typeFile;

        if (type === 'Image') {
            typeFile = file.type.startsWith('image') ? 'IMAGE' : "VIDEO";
        } else {
            typeFile = 'FILE'
        }

        // console.log("file type", file.type);


        fmData.append("file", file);

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