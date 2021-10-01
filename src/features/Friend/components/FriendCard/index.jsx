import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import PersonalIcon from 'features/Chat/components/PersonalIcon';
import { Button } from 'antd';
FriendCard.propTypes = {

};

function FriendCard(props) {
    return (
        <div className='friend-card'>
            <div className="friend-card_info-user">
                <div className="friend-card_avatar">
                    <PersonalIcon
                        avatar='https://gamek.mediacdn.vn/133514250583805952/2021/9/27/photo-1-16327266531011368258445.jpg'
                        demention={72}
                    />
                </div>
                <div className="friend-card_name">
                    Lê Thị Bống Bang
                </div>
            </div>

            <div className="friend-card_interact">
                <div className="friend-card_button friend-card_button--deny">
                    <Button type="default" shape="round" >
                        Bỏ qua
                    </Button>
                </div>

                <div className="friend-card_button friend-card_button--accept">
                    <Button type="primary" shape="round" >
                        Đồng ý
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FriendCard;