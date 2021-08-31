import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import DividerCustom from '../DividerCustom';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import { FaReplyAll } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LikeOutlined, LikeTwoTone } from '@ant-design/icons';
import { Button, Popover } from 'antd';

UserMessage.propTypes = {

};

function UserMessage(props) {

    const constent = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    )

    return (
        <div id='user-message'>
            <DividerCustom />
            <div className='interact-conversation '>
                <div className="avatar-user">
                    <PersonalIcon
                        isHost={true}
                        demention={40}
                    />
                </div>
                <div className="list-conversation">
                    <div className="message">
                        <div className="sub-message">
                            <div className='content-message'>
                                <span className='author-message'>Hoàng phúc</span>
                                <span>
                                    Ta thường mơ về một thoáng chốc được bên nàng
                                    Tâm hồn say lạc giữa thành phố một đêm vàng
                                    Dưới ánh đèn đường hiu hắc, tương tư văng vẳng không im
                                    Nàng chỉ gửi một ánh mắt, ta đã trao cả con tim
                                    Giữa biển người nhưng anh chỉ có em trong mắt
                                    Giữa một rừng thanh âm chỉ nghe thấy tiếng em trong vắt
                                </span>

                                <div className="reaction">

                                    <div className='reaction-thumbnail'>
                                        <LikeOutlined />

                                        <div className='list_icon-reaction'>
                                            <span>👍</span>
                                            <span>❤️</span>
                                            <span>😆</span>
                                            <span>😮</span>
                                            <span>😭</span>
                                            <span>😡</span>
                                        </div>
                                    </div>


                                </div>


                                <div className="reacted-block">
                                    <div className="list-user-react">
                                        <div className="list-user-react-icon">
                                            <div>
                                                <span>😭</span>
                                                <span>😡</span>
                                                <span className='count-reated'>
                                                    2
                                                </span>
                                            </div>

                                            <div className="list-user-detail">
                                                <span>Bạn</span>
                                                <span>Tiên Huỳnh</span>
                                                <span>Nhật Hào</span>
                                                <span>Đức Bo</span>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="your-react">

                                        <span className='react-current'>😡</span>
                                        <div className='list_icon-reaction'>
                                            <span>👍</span>
                                            <span>❤️</span>
                                            <span>😆</span>
                                            <span>😮</span>
                                            <span>😭</span>
                                            <span>😡</span>
                                        </div>


                                    </div>
                                </div>






                            </div>
                            <div className="interaction">
                                <div className="reply icon-interact" >
                                    <MdQuestionAnswer />
                                </div>

                                <div className="forward icon-interact">
                                    <FaReplyAll />
                                </div>

                                <div className="additional icon-interact">
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div>



                        </div>

                        <div className="sub-message">
                            <div className='content-message'>
                                <span>
                                    Ta thường mơ về một thoáng chốc được bên nàng
                                </span>

                                <div className="reaction">
                                    <LikeOutlined />
                                </div>

                            </div>
                            <div className="interaction">
                                <div className="reply icon-interact" >
                                    <MdQuestionAnswer />
                                </div>

                                <div className="forward icon-interact">
                                    <FaReplyAll />
                                </div>

                                <div className="additional icon-interact">
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div>

                        </div>

                        <div className="sub-message ">
                            <div className='content-message'>
                                <span>
                                    Ta thường mơ về một thoáng chốc được bên nàng
                                    Tâm hồn say lạc giữa thành phố một đêm vàng
                                    Giữa một rừng thanh âm chỉ nghe thấy tiếng em trong vắt
                                </span>

                                <div className="reaction">
                                    <LikeOutlined />
                                </div>


                                <div className="time-send">
                                    <span>15:40</span>
                                </div>
                            </div>
                            <div className="interaction">
                                <div className="reply icon-interact" >
                                    <MdQuestionAnswer />
                                </div>

                                <div className="forward icon-interact">
                                    <FaReplyAll />
                                </div>

                                <div className="additional icon-interact">
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>


            <div className='interact-conversation reverse last-message' >
                <div className="avatar-user">
                    <PersonalIcon
                        isHost={true}
                        demention={40}
                    />
                </div>
                <div className="list-conversation ">
                    <div className="message">
                        <div className="sub-message reverse">
                            <div className='content-message'>
                                <span className='author-message'>Hoàng phúc</span>
                                <span>
                                    Ta thường mơ về một thoáng chốc được bên nàng
                                    Tâm hồn say lạc giữa thành phố một đêm vàng
                                    Dưới ánh đèn đường hiu hắc, tương tư văng vẳng không im
                                    Nàng chỉ gửi một ánh mắt, ta đã trao cả con tim
                                    Giữa biển người nhưng anh chỉ có em trong mắt
                                    Giữa một rừng thanh âm chỉ nghe thấy tiếng em trong vắt
                                </span>

                                <div className="reaction reaction-reverse">
                                    <LikeOutlined />
                                </div>

                            </div>
                            <div className="interaction">
                                <div className="reply icon-interact" >
                                    <MdQuestionAnswer />
                                </div>

                                <div className="forward icon-interact">
                                    <FaReplyAll />
                                </div>

                                <div className="additional icon-interact">
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div>


                        </div>

                        <div className="sub-message reverse">
                            <div className='content-message'>
                                <span>
                                    Ta thường mơ về một thoáng chốc được bên nàng
                                </span>

                                <div className="reaction reaction-reverse">
                                    <LikeOutlined />
                                </div>


                            </div>
                            <div className="interaction">
                                <div className="reply icon-interact" >
                                    <MdQuestionAnswer />
                                </div>

                                <div className="forward icon-interact">
                                    <FaReplyAll />
                                </div>

                                <div className="additional icon-interact">
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div>

                        </div>

                        <div className="sub-message reverse">
                            <div className='content-message'>
                                <span>
                                    Ta thường mơ về một thoáng chốc được bên nàng
                                    Tâm hồn say lạc giữa thành phố một đêm vàng
                                    Giữa một rừng thanh âm chỉ nghe thấy tiếng em trong vắt
                                </span>
                                <div className="reaction reaction-reverse">
                                    <LikeOutlined />
                                </div>


                                <div className="time-send">
                                    <span>15:40</span>
                                </div>
                            </div>
                            <div className="interaction">
                                <div className="reply icon-interact" >
                                    <MdQuestionAnswer />
                                </div>

                                <div className="forward icon-interact">
                                    <FaReplyAll />
                                </div>

                                <div className="additional icon-interact">
                                    <BiDotsHorizontalRounded />
                                </div>
                            </div>


                        </div>

                    </div>







                </div>
            </div>

        </div>
    );
}

export default UserMessage;