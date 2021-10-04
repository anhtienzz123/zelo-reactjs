import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ConversationAvatar from 'features/Chat/components/ConversationAvatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import classifyUtils from 'utils/classifyUtils'
GroupCard.propTypes = {
    data: PropTypes.object,

};

GroupCard.defaultProps = {
    data: {},

};

function GroupCard({ data }) {
    const { classifies } = useSelector(state => state.chat);
    const [classify, setClassify] = useState(null);

    useEffect(() => {
        if (classifies.length > 0) {
            setClassify(classifyUtils.getClassifyOfObject(data._id, classifies));
            console.log('check eror', classifyUtils.getClassifyOfObject(data._id, classifies));
        }
    }, [data]);


    const mainCard = (
        <div className='group-card'>

            <div className="group-card__avatar-group">
                <ConversationAvatar
                    avatar={data.avatar}
                    demension={52}
                    isGroupCard={true}
                />

            </div>

            <div className="group-card__name-group">
                {data.name}
            </div>

            <div className="group-card__total-member">
                {`${data.totalMembers} thành viên`}
            </div>
            <div className="group-card__interact">
                <BsThreeDotsVertical />
            </div>


        </div>
    )



    return (
        <>
            {classify ? (<Badge.Ribbon text={classify.name} color={classify.color.code} placement='start'>
                {mainCard}
            </Badge.Ribbon>) : (
                mainCard
            )}

        </>


    );
}

export default GroupCard;