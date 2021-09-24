import { AlignLeftOutlined, AppstoreAddOutlined, SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Input, Radio } from 'antd';
import { createGroup } from 'features/Chat/chatSlice';
import ModalClassify from 'features/Chat/components/ModalClassify';
import ModalCreateGroup from 'features/Chat/components/ModalCreateGroup';
import React, { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
SearchContainer.propTypes = {

};

function SearchContainer(props) {
    const [valueSearch, setValueSearch] = useState(0);
    const [isModalCreateGroupVisible, setIsModalCreateGroupVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { classifies } = useSelector(state => state.chat);
    const [isShowModalClasify, setIsShowModalClasify] = useState(false);
    const dispatch = useDispatch();

    // -----  handle modal classify

    const handleCreateClasify = () => {
        setIsShowModalClasify(true);
    }

    const handleCancelClassifyModal = () => {
        setIsShowModalClasify(false);
    }

    const handleOpenModalClassify = () => {
        setIsShowModalClasify(true)
    }
    // ------ 





    const handleOnChange = (e) => {
        setValueSearch(e.target.value);
    };


    const handleCreateGroup = () => {
        setIsModalCreateGroupVisible(true);
    }


    const handleCancelModalCreatGroup = (value) => {
        setIsModalCreateGroupVisible(value);
    }

    const handleOklModalCreatGroup = (value) => {

        setConfirmLoading(true);
        dispatch(createGroup(value));
        setConfirmLoading(false);
        setIsModalCreateGroupVisible(false);

    }


    return (
        <div id='search-wrapper'>
            <div className="search-main">
                <div className="search-top">
                    <div className="search-top_input-search">
                        <Input
                            placeholder="Tìm kiếm"
                            prefix={<SearchOutlined />}
                        />
                    </div>

                    <div className="search-top_add-friend">
                        <UserAddOutlined />
                    </div>

                    <div className="search-top_create-group" onClick={handleCreateGroup}>
                        <UsergroupAddOutlined />
                    </div>
                </div>

                <div className="search-bottom">
                    <div className='classify-title'>
                        <div>
                            <AlignLeftOutlined /> &nbsp;
                            <span>Phân loại</span>
                        </div>
                        <div className='add-classify' onClick={handleCreateClasify}>
                            <AppstoreAddOutlined />
                        </div>

                    </div>

                    <div className='classify-element'>
                        <Scrollbars
                            autoHide={true}
                            autoHideTimeout={1000}
                            autoHideDuration={200}
                            style={{ height: '42px', width: '100%' }}
                        >

                            <Radio.Group onChange={handleOnChange} value={valueSearch} size='small' >
                                <Radio value={0}>Tất cả</Radio>
                                {classifies.map(ele => (
                                    <Radio value={ele._id}>{ele.name}</Radio>
                                ))}


                            </Radio.Group>



                        </Scrollbars>

                    </div>
                </div>
            </div>






            <ModalCreateGroup
                isVisible={isModalCreateGroupVisible}
                onCancel={handleCancelModalCreatGroup}
                onOk={handleOklModalCreatGroup}
                loading={confirmLoading}
            />


            <ModalClassify
                isVisible={isShowModalClasify}
                onCancel={handleCancelClassifyModal}
                onOpen={handleOpenModalClassify}
            />




        </div>
    );
}

export default SearchContainer;