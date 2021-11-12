import { Image, Modal } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';
import OverlayImage from 'components/OverlayImage';


ModalDetailMessageReply.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
    data: PropTypes.object,
};

ModalDetailMessageReply.defaultProps = {
    onCancel: null,
    data: null
};


function ModalDetailMessageReply({ visible, onCancel, data }) {

    const { content, userName, userId, _id, type } = data;


    const handleCancel = () => {
        console.log('asdfsdafas')
        if (onCancel) {
            onCancel();
        }
    }

    return (


        <Modal
            visible={visible}
            footer={null}
            onCancel={handleCancel}
            closable={false}

        >
            <div className="modal-detail-reply">
                {type === 'TEXT' && (
                    <div className="reply-item">
                        {/* <PersonalIcon


                        /> */}
                    </div>
                )}

                {type === 'IMAGE' && (

                    <div className="reply-item">
                        <Image
                            src={content}
                            preview={{ mask: <OverlayImage /> }}

                        />
                    </div>

                )}

                {type === 'STICKER' && (

                    <div className="reply-item">
                        <Image
                            src={content}
                            preview={{ mask: <OverlayImage />, visible: false }}

                        />
                    </div>

                )}

                {type === 'VIDEO' && (

                    <div className="reply-item">
                        <Image
                            src={content}
                            preview={{ mask: <OverlayImage />, visible: false }}

                        />
                    </div>

                )}
            </div>
        </Modal>

    );
}

export default ModalDetailMessageReply;