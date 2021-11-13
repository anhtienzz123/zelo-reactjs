import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Button, Modal } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import ModalDetailVote from '../../ModalDetailVote';
import ModalViewOption from 'components/ModalViewOption';

VoteMessage.propTypes = {
    data: PropTypes.object,
};

VoteMessage.defaultProps = {
    data: {},
};

function VoteMessage({ data }) {
    const [isVisibleDetail, setIsVisibleDetail] = useState(false);
    const [isVisibleOption, setIsVisibleOption] = useState(false);



    const handleDetailVote = () => {
        setIsVisibleDetail(true)
    }

    const handleViewOption = () => {
        setIsVisibleOption(true);
    }

    const checkNumberUserSelected = () => {
        let count = 0;
        data.options.forEach((option) => {
            if (option.userIds.length > 0) {
                count += option.userIds.length;
            }
        })
        return count;
    }


    const countingPercent = (amoutVote) => {
        return (amoutVote / checkNumberUserSelected()) * 100;
    }
    return (
        <div className='vote-message-wrapper'>
            <div className="vote-message">
                <h3>{data.content}</h3>

                {checkNumberUserSelected > 0 && (
                    <span onClick={handleDetailVote} className="vote-message_number-voted">Đã có {checkNumberUserSelected} lượt bình chọn <CaretRightOutlined /></span>
                )}
                <div className="vote-message_list">

                    {data.options.map((ele, index) => {
                        if (index < 2) {
                            return (
                                <div className="vote-message_item" key={index}>

                                    <span className="vote-message_name-option">
                                        {ele.name}
                                    </span>

                                    <strong className="vote-message_munber-voted">
                                        {ele.userIds.length}
                                    </strong>
                                    <div className="vote-message_progress" style={{ width: countingPercent(ele.userIds.length) }} />
                                </div>
                            )
                        }
                    }

                    )}
                    {/* <div className="vote-message_item">

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
                    </div> */}

                </div>

                <div className="vote-message_view-all">
                    <Button onClick={handleViewOption} type='primary' style={{ width: '100%' }}>Xem lựa chọn</Button>
                </div>
            </div>


            <ModalDetailVote
                visible={isVisibleDetail}
                onCancel={() => setIsVisibleDetail(false)}
            />

            <ModalViewOption
                isModalVisible={isVisibleOption}
                onCancel={() => setIsVisibleOption(false)}
            />
        </div>
    );
}

export default VoteMessage;