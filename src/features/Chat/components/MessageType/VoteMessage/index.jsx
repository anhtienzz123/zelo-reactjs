import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Button, Modal } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import ModalDetailVote from '../../ModalDetailVote';

VoteMessage.propTypes = {
    content: PropTypes.object,
};

VoteMessage.defaultProps = {
    content: {},
};

function VoteMessage({ content }) {
    const [isVisibleDetail, setIsVisibleDetail] = useState(false);



    const handleDetailVote = () => {
        setIsVisibleDetail(true)
    }
    return (
        <div className='vote-message-wrapper'>
            <div className="vote-message">
                <h3>{content}</h3>

                <span onClick={handleDetailVote} className="vote-message_number-voted">Đã có 1 lượt bình chọn <CaretRightOutlined /></span>

                <div className="vote-message_list">
                    <div className="vote-message_item">

                        <span className="vote-message_name-option">
                            Bán kem đánh răng
                        </span>

                        <strong className="vote-message_munber-voted">
                            3
                        </strong>
                        <div className="vote-message_progress" style={{ width: '50%' }} />
                    </div>

                    <div className="vote-message_item">
                        <span className="vote-message_name-option">
                            Bán kem đánh răng
                        </span>

                        <strong className="vote-message_munber-voted">
                            3
                        </strong>
                    </div>

                </div>

                <div className="vote-message_view-all">
                    <Button type='primary' style={{ width: '100%' }}>Xem lựa chọn</Button>
                </div>
            </div>


            <ModalDetailVote
                visible={isVisibleDetail}
                onCancel={() => setIsVisibleDetail(false)}
            />
        </div>
    );
}

export default VoteMessage;