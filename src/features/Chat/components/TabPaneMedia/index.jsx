import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Select, DatePicker } from 'antd';
import PersonalIcon from '../PersonalIcon';
import './style.scss';
import FsLightbox from 'fslightbox-react';
import RangeCalendarCustom from 'components/RangeCalendarCustom';

TabPaneMedia.propTypes = {};

function TabPaneMedia(props) {
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const dateFormat = 'DD/MM/YYYY';

    const [toggler, setToggler] = useState(false);

    const [productIndex, setProductIndex] = useState(0);
    const image = [
        'https://i.imgur.com/fsyrScY.jpg',
        'https://www.youtube.com/watch?v=xshEZzpS4CQ',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    function onSearch(val) {
        console.log('search:', val);
    }

    const handleDatePickerChange = (date, dateString) => {
        console.log('date', date);
        console.log('date String', dateString);
    };

    const handleLenghtText = (text) => {
        if (text.length > 14) {
            return text.substring(0, 15) + '...';
        }
    };

    return (
        <div id='tabpane-media'>
            <Row gutter={[16, 8]}>
                <Col span={12}>
                    <Select
                        dropdownMatchSelectWidth={false}
                        optionLabelProp='label'
                        showSearch
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder='Người gửi'
                        optionFilterProp='children'
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.value
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children
                                .toLowerCase()
                                .localeCompare(optionB.children.toLowerCase())
                        }>
                        <Option
                            value='1'
                            title='ádkljfklajskldjflkjaklsdf'
                            label='Hoàng Hạ Xuyên'>
                            <div className='option-item'>
                                <div className='icon-user-item'>
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className='name-user-item'>
                                    Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value='2' label='Nguyễn Hoàng Hạ Xuyên'>
                            <div className='option-item'>
                                <div className='icon-user-item'>
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className='name-user-item'>
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>
                        <Option value='3' label='Nguyễn Hoàng Hạ Xuyên'>
                            <div className='option-item'>
                                <div className='icon-user-item'>
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className='name-user-item'>
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value='3' label='Nguyễn Hoàng Hạ Xuyên'>
                            <div className='option-item'>
                                <div className='icon-user-item'>
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className='name-user-item'>
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value='3' label='Nguyễn Hoàng Hạ Xuyên'>
                            <div className='option-item'>
                                <div className='icon-user-item'>
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className='name-user-item'>
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value='3' label='Nguyễn Hoàng Hạ Xuyên'>
                            <div className='option-item'>
                                <div className='icon-user-item'>
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className='name-user-item'>
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value='3' label='Nguyễn Hoàng Hạ Xuyên'>
                            <div className='option-item'>
                                <div className='icon-user-item'>
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className='name-user-item'>
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value='3' label='Nguyễn Hoàng Hạ Xuyên'>
                            <div className='option-item'>
                                <div className='icon-user-item'>
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className='name-user-item'>
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>
                    </Select>
                </Col>
                <Col span={12}>
                    <Select
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder='Ngày gửi'>
                        <Option value={1}>Trong vòng 1 tuần</Option>
                        <Option value={2}>Trong vòng 1 tháng</Option>
                        <Option value={3}>Trong vòng 3 tháng </Option>
                    </Select>
                </Col>

                <Col span={24}>
                    {/* <RangePicker
                        style={{ width: '100%' }}
                        placeholder={['Từ ngày', 'Đến ngày']}
                        format={dateFormat}
                        onChange={handleDatePickerChange}
                    /> */}

                    <RangeCalendarCustom
                        style={{ width: '100%' }}
                        onChange={handleDatePickerChange}
                    />
                </Col>
                {/* 
               <Col span={24} >

                    {/* <button onClick={() => setToggler(!toggler)}>
                        Toggle Lightbox
                    </button> */}
                {/* https://fslightbox.com/react/documentation/control-slide-number */}

                {/* <FsLightbox
                        toggler={toggler}
                        sources={image}
                        slide={2}
                        thumbs={[
                            null,
                            'images/second.png',
                            'images/third.jpg'
                        ]}
                    /> *



                </Col> */}
            </Row>
        </div>
    );
}

export default TabPaneMedia;
