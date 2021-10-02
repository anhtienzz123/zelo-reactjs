import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ConversationAvatar from 'features/Chat/components/ConversationAvatar';
GroupCard.propTypes = {

};

function GroupCard(props) {

    const avatar1 = [
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",

    ]

    const avatar2 = [
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",


    ]


    const avatar3 = [
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",
        "https://gamek.mediacdn.vn/133514250583805952/2020/11/27/thao-trang-16064463501642042849142.jpg",


    ]


    return (
        <div className='group-card'>
            <div className="group-card__avatar-group">
                <ConversationAvatar
                    avatar={avatar3}
                    demension={52}
                    isGroupCard={true}
                />

            </div>

            <div className="group-card__name-group">
                "Tài liệu học tập"
            </div>

            <div className="group-card__total-member">
                30 thành viên
            </div>
        </div>
    );
}

export default GroupCard;