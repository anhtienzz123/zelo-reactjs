import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import './style.scss';
import DrawerPinMessageStyle from './DrawerPinMessageStyle'
import { CaretUpOutlined, RightOutlined } from '@ant-design/icons';
import NutshellPinMessage from '../NutshellPinMessage/NutshellPinMessage';
DrawerPinMessage.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    message: PropTypes.array,
    onViewNews: PropTypes.func,
};

DrawerPinMessage.defaultProps = {
    onOpen: null,
    onClose: null,
    message: [],
    onViewNews: null
};

function DrawerPinMessage({ isOpen, onOpen, onClose, message, onViewNews }) {

    const handlViewNews = () => {
        if (onViewNews && onClose) {
            onViewNews()
            onClose()
        }
    }


    const handleOnCloseDrawer = () => {
        if (onClose) {
            onClose()
        }
    }
    const myElem = useRef();
    return (
        <div id="drawer-pin">
            <div id="drawer-container" ref={myElem} >
                <Drawer
                    onClose={handleOnCloseDrawer}
                    visible={isOpen}
                    placement="top"
                    closable={false}
                    getContainer={() => myElem.current}
                    style={{ position: "absolute", overflow: 'hidden' }}
                    bodyStyle={DrawerPinMessageStyle.WRAPPER_STYLE}
                >


                    <div className="drawer-header">
                        <div className="drawer-header-title">
                            {`Danh sách ghim (${message.length})`}
                        </div>

                        <div className="drawer-header-collapse" onClick={handleOnCloseDrawer}>
                            Thu gọn <CaretUpOutlined />
                        </div>
                    </div>

                    <div className="drawer-body">
                        {message.map((ele, index) => (
                            <NutshellPinMessage
                                key={index}
                                message={ele}
                                isItem={true}
                                onViewNews={onViewNews}
                            />
                        ))}
                    </div>

                    <div className="drawer-footer" onClick={handlViewNews}>
                        Xem tất cả ở bảng tin nhóm <RightOutlined />
                    </div>

                </Drawer>
            </div>
        </div>
    );
}

export default DrawerPinMessage;