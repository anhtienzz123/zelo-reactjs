import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import PersonalIcon from '../PersonalIcon';
import './style.scss';

ModalDetailVote.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func,
};

ModalDetailVote.defaultProps = {
    onCancel: null,
};

function ModalDetailVote({ visible, onCancel }) {

    const handleCancel = () => {
        if (onCancel) {
            onCancel()
        }
    }

    return (
        <Modal
            title="Chi tiết bình chọn"
            visible={visible}
            footer={null}
            onCancel={handleCancel}
        >
            <div className="detail-vote-wrapper">
                <div className="detail-vote_item">
                    <span className='detail-vote_option'>Bán kem đanh găng (2)</span>
                    <div className="detail-vote_list-user">
                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>

                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>

                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>


                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>


                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>


                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>
                    </div>
                </div>

                <div className="detail-vote_item">
                    <span className='detail-vote_option'>Bán kem đanh găng (2)</span>
                    <div className="detail-vote_list-user">
                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>

                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>

                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>


                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>


                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>


                        <div className="detail-vote_user-item">
                            <div className="detail-vote_avatar">
                                <PersonalIcon
                                    name="Hoàng Phúc"
                                    avatar='https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/nguyenanhson/2021_06_18/3/nhay-quyen-ru-lo-body-sieu-hot-hot-girl-tram-anh-dot-mat-netizen.jpg'
                                />
                            </div>

                            <div className="detail-vote_name">
                                Trâm anh
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalDetailVote;