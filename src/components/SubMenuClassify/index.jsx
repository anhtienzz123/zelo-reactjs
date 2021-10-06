import { TagsOutlined, TagTwoTone } from '@ant-design/icons';
import { Divider, Menu } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalClassify from 'features/Chat/components/ModalClassify';

SubMenuClassify.propTypes = {
    data: PropTypes.array,
};

SubMenuClassify.defaultProps = {
    data: []
};



function SubMenuClassify({ data }) {
    const { SubMenu } = Menu;
    const [visible, setVisible] = useState(false);



    const handleClickClassify = (id) => {
        console.log(id);
    }

    return (
        <SubMenu
            title={<span className="menu-item--highlight">Phân loại</span>}
            key="sub-1"
        >

            {
                data.length > 0 && (
                    data.map(ele => (
                        <Menu.Item
                            key={ele._id}
                            icon={<TagTwoTone twoToneColor={ele.color.code} />}
                            onClick={() => handleClickClassify(ele._id)}
                        >
                            {ele.name}
                        </Menu.Item>
                    ))
                )
            }

            <Divider style={{ margin: '1rem 2rem' }} />
            <Menu.Item
                key="0"
                icon={<TagsOutlined />}
                onClick={() => setVisible(true)}

            >
                <span className="menu-item--highlight">Quản lý thẻ phân loại</span>
            </Menu.Item>


            <ModalClassify
                isVisible={visible}
                onCancel={() => setVisible(false)}
                onOpen={() => setVisible(true)}
            />

        </SubMenu>
    );
}

export default SubMenuClassify;