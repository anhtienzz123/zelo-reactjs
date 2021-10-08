import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import ConversationAvatar from 'features/Chat/components/ConversationAvatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Badge, Button, Divider } from 'antd';
import { useSelector } from 'react-redux';
import classifyUtils from 'utils/classifyUtils';
import { Menu, Dropdown } from 'antd';
import { TagsOutlined, TagTwoTone } from '@ant-design/icons';
import SubMenuClassify from 'components/SubMenuClassify';

GroupCard.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func,
};

GroupCard.defaultProps = {
    data: {},
    onRemove: null

};

function GroupCard({ data, onRemove }) {
    const { classifies } = useSelector(state => state.chat);
    const [classify, setClassify] = useState(null);



    useEffect(() => {
        if (classifies.length > 0) {
            setClassify(classifyUtils.getClassifyOfObject(data._id, classifies));
        }
    }, [classifies]);


    const handleOnSelectMenu = ({ key }) => {

        if (key === '2') {
            if (onRemove) {
                onRemove(key, data._id);
            }
        }

    }


    const menu = (
        <Menu onClick={handleOnSelectMenu}>

            <SubMenuClassify
                data={classifies}
                idConver={data._id}
            />


            <Menu.Item key="2" danger>
                <span className="menu-item--highlight">Rời nhóm</span>
            </Menu.Item>
        </Menu>
    );



    const mainCard = (
        <Dropdown overlay={menu} trigger={['contextMenu']}>
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
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button
                            type='text'
                            icon={<BsThreeDotsVertical />}
                        />
                    </Dropdown>
                </div>


            </div>
        </Dropdown>
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