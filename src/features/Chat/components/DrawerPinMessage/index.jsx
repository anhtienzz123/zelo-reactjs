import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import './style.scss';
import DrawerPinMessageStyle from './DrawerPinMessageStyle'
import { CaretUpOutlined } from '@ant-design/icons';
import NutshellPinMessage from '../NutshellPinMessage/NutshellPinMessage';
DrawerPinMessage.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

DrawerPinMessage.defaultProps = {
    onOpen: null,
    onClose: null,
};

function DrawerPinMessage({ isOpen, onOpen, onClose }) {


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
                            {`Danh sách ghim (2)`}
                        </div>

                        <div className="drawer-header-collapse" onClick={handleOnCloseDrawer}>
                            Thu gọn <CaretUpOutlined />
                        </div>
                    </div>

                    <div className="drawer-body">
                        <NutshellPinMessage
                            isItem={true}
                        />

                        <NutshellPinMessage
                            isItem={true}
                        />
                        <NutshellPinMessage
                            isItem={true}
                        />

                    </div>

                </Drawer>
            </div>
        </div>
    );
}

export default DrawerPinMessage;