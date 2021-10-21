import { FontColorsOutlined, PlaySquareOutlined } from '@ant-design/icons';
import { Image, Tag } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import OverlayImage from 'components/OverlayImage';
import './style.scss';
import fileHelpers from 'utils/fileHelpers';
TypeMessagePin.propTypes = {
    type: PropTypes.string,
    content: PropTypes.string,
    name: PropTypes.string,
};


TypeMessagePin.defaultProps = {
    type: '',
    content: '',
    name: ''
};



function TypeMessagePin({ type, content, name }) {
    return (
        <div clasName='type-pin-message'>
            {
                type === 'TEXT' && (
                    <div>{`${name}: ${content}`}</div>
                )
            }

            {
                type === 'IMAGE' && (
                    <div className='type-pin-message_IMAGE'>
                        <div className="type-pin-message_name">
                            {name}:&nbsp;
                        </div>

                        <div className="type-pin-message_des">
                            <Image
                                height={20}
                                src={content}
                                preview={{ mask: <OverlayImage />, visible: false }}
                            />
                        </div>

                    </div>

                )
            }

            {
                type === 'HTML' && (
                    <div className='type-pin-message_HTML'>
                        <div className="type-pin-message_name">
                            {name}:&nbsp;
                        </div>

                        <div className="type-pin-message_des">
                            <Tag color="processing"><FontColorsOutlined /> Định dạng văn bản</Tag>
                        </div>
                    </div>
                )
            }

            {
                type === 'VIDEO' && (
                    <div className='type-pin-message_VIDEO'>
                        <div className="type-pin-message_name">
                            {name}:&nbsp;
                        </div>

                        <div className="type-pin-message_des">
                            <Tag color="processing"><PlaySquareOutlined />  {fileHelpers.getFileName(content)}</Tag>

                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default TypeMessagePin;