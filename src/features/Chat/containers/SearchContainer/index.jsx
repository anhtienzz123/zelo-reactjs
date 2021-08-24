import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Radio } from 'antd';
import { Input } from 'antd';
import { AlignLeftOutlined, AppstoreAddOutlined, SearchOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import Scrollbars from 'react-custom-scrollbars';
SearchContainer.propTypes = {

};

function SearchContainer(props) {
    const [valueSearch, setValueSearch] = useState(0);




    const options = [

        { label: 'Tất cả', value: 0 },
        { label: 'Khách hàng', value: 'Khách hàng' },
        { label: 'Gia đình', value: 'Gia đình' },
        { label: 'Công việc', value: 'Công việc' },
        { label: 'Bạn bè', value: 'Bạn bè' },
        { label: 'Bạn gái', value: 'Bạn gái' },
        { label: 'Em gái nuôi', value: 'Em gái nuôi' },

    ];

    const handleOnChange = (e) => {
        console.log('radio1 checked', e.target.value);
        setValueSearch(e.target.value);
    };
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

                    <div className="search-top_create-group">
                        <UsergroupAddOutlined />
                    </div>
                </div>

                <div className="search-bottom">
                    <div className='classify-title'>
                        <div>
                            <AlignLeftOutlined /> &nbsp;
                            <span>Phân loại</span>
                        </div>
                        <div className='add-classify'>
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

                            <Radio.Group options={options} onChange={handleOnChange} value={valueSearch} />



                        </Scrollbars>






                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchContainer;