import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Select, DatePicker } from 'antd';
import PersonalIcon from '../PersonalIcon';
import './style.scss';
TabPaneMedia.propTypes = {

};

function TabPaneMedia(props) {
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const dateFormat = 'DD/MM/YYYY';

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    const handleDatePickerChange = (date, dateString) => {
        console.log('date', date);
        console.log('date String', dateString);

    }

    const handleLenghtText = (text) => {
        if (text.length > 14) {
            return text.substring(0, 15) + '...'
        }
    }
    return (
        <div id='tabpane-media'>
            <Row gutter={[16, 8]}>
                <Col span={12} >
                    <Select
                        dropdownMatchSelectWidth={false}
                        optionLabelProp="label"
                        showSearch
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder="Người gửi"
                        optionFilterProp="children"
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option
                            value="1"
                            title='ádkljfklajskldjflkjaklsdf'
                            label="Hoàng Hạ Xuyên"

                        >
                            <div className='option-item'>
                                <div className="icon-user-item">
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className="name-user-item">
                                    Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>



                        <Option value="2" label="Nguyễn Hoàng Hạ Xuyên">
                            <div className='option-item'>
                                <div className="icon-user-item">
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className="name-user-item">
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>
                        <Option value="3" label="Nguyễn Hoàng Hạ Xuyên">
                            <div className='option-item'>
                                <div className="icon-user-item">
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className="name-user-item">
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value="3" label="Nguyễn Hoàng Hạ Xuyên">
                            <div className='option-item'>
                                <div className="icon-user-item">
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className="name-user-item">
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value="3" label="Nguyễn Hoàng Hạ Xuyên">
                            <div className='option-item'>
                                <div className="icon-user-item">
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className="name-user-item">
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value="3" label="Nguyễn Hoàng Hạ Xuyên">
                            <div className='option-item'>
                                <div className="icon-user-item">
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className="name-user-item">
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value="3" label="Nguyễn Hoàng Hạ Xuyên">
                            <div className='option-item'>
                                <div className="icon-user-item">
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className="name-user-item">
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>

                        <Option value="3" label="Nguyễn Hoàng Hạ Xuyên">
                            <div className='option-item'>
                                <div className="icon-user-item">
                                    <PersonalIcon demention={24} />
                                </div>

                                <div className="name-user-item">
                                    Nguyễn Hoàng Hạ Xuyên
                                </div>
                            </div>
                        </Option>
                    </Select>
                </Col>
                <Col span={12} >
                    <Select
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder="Ngày gửi"
                    >
                        <Option value={1}>Trong vòng 1 tuần</Option>
                        <Option value={2}>Trong vòng 1 tháng</Option>
                        <Option value={3}>Trong vòng 3 tháng </Option>

                    </Select>
                </Col>

                <Col span={24} >
                    <RangePicker
                        style={{ width: '100%' }}
                        placeholder={['Từ ngày', 'Đến ngày']}
                        format={dateFormat}
                        onChange={handleDatePickerChange}

                    />
                </Col>
            </Row>
        </div>
    );
}

export default TabPaneMedia;