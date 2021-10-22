import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Image, Modal } from 'antd';
import OverlayImage from 'components/OverlayImage';
import ModalVideoCustom from 'components/ModalVideoCustom';
import PinItem from '../PinItem';
import parse from 'html-react-parser';


ModalDetailMessagePin.propTypes = {
    visible: PropTypes.bool,
    message: PropTypes.object,
    onClose: PropTypes.func,
};

ModalDetailMessagePin.defaultProps = {
    visible: false,
    message: {},
    onClose: null
};

function ModalDetailMessagePin({ visible, message, onClose }) {

    const handleOnClose = () => {
        if (onClose) {
            onClose()
        }
    }

    return (
        <div className='modal-detail-message-pin'>
            {(message.type === 'TEXT' || message.type === 'HTML') && (

                <Modal
                    visible={visible}
                    footer={null}
                    onCancel={handleOnClose}
                    closable={false}

                >
                    <PinItem
                        message={message}
                    >
                        {message.type === 'TEXT' ? (
                            message.content
                        ) : (
                            parse(message.content)
                        )}

                    </PinItem>

                </Modal>
            )}


            {message.type === 'IMAGE' && (

                <Image
                    preview={
                        {
                            visible: visible,
                            onVisibleChange: (visible, prevVisible) => {
                                if (onClose) {
                                    onClose()
                                }
                            },
                            mask: <OverlayImage />
                        }
                    }
                    src={message.content}
                    style={{ display: 'none' }}
                />

            )}


            {message.type === 'VIDEO' && (


                <ModalVideoCustom
                    isVisible={visible}
                    url={message.content}
                    onClose={handleOnClose}
                />

            )}

        </div>
    );
}

export default ModalDetailMessagePin;