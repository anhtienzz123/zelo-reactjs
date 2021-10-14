import { message, Upload } from 'antd';
import messageApi from 'api/messageApi';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import ACCEPT_FILE from 'constants/acceptFile'

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

        const { uid, name, type, lastModified, lastModifiedDate, size, webkitRelativePath } = file;

        const fmData = new FormData();
        // const typeFile = file.type.startsWith('image') ? true : false;
        let typeFile

        if (typeOfFile === 'media') {
            typeFile = file.type.startsWith('image') ? 'IMAGE' : "VIDEO";
            fmData.append("file", file);
        } else {
            typeFile = 'FILE';
            if (name.slice(-4) === '.rar') {
                // // const tempFile = {
                // //     uid,
                // //     name,
                // //     lastModified,
                // //     lastModifiedDate,
                // //     size,
                // //     webkitRelativePath,
                // //     type: 'application/vnd.rar'

                // // }

                // // const tempFIle = file;
                // delete file.type
                // console.log("tempFIle", file)

                // fmData.append("file", f);
            } else {
                fmData.append("file", file);
            }


        }

        console.log(file)
        // console.log(typeof file)
        // console.log(name.slice(-4));
        // console.log('formdata', fmData);


        const attachInfo = {
            type: typeFile,
            conversationId: currentConversation
        }
        try {
            await messageApi.sendFileThroughMessage(fmData, attachInfo, (percentCompleted) => {
                console.log('value', percentCompleted);
            });
            message.success(`${file.name} file uploaded successfully`);
        } catch (e) {
            message.error(`${file.name} file upload failed.`);
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