import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Select, DatePicker } from 'antd';
import PersonalIcon from '../PersonalIcon';
import './style.scss';
import FsLightbox from 'fslightbox-react';
import RangeCalendarCustom from 'components/RangeCalendarCustom';
import fileHelpers from 'utils/fileHelpers';

TabPaneMedia.propTypes = {
    members: PropTypes.array,
    onQueryChange: PropTypes.func,
};

TabPaneMedia.defaultProps = {
    members: [],
    onQueryChange: null,
};

function TabPaneMedia(props) {
    const { members, onQueryChange } = props;
    const { Option } = Select;

    const [sender, setSender] = useState('');
    const [query, setQuery] = useState({});
    const handleChange = (memberId) => {
        const index = members.findIndex(
            (memberEle) => memberEle._id == memberId
        );

        setSender(members[index].name);
        const queryTempt = {
            ...query,
            senderId: memberId,
        };
        setQuery(queryTempt);
        if (onQueryChange) onQueryChange(queryTempt);
    };

    // function onSearch(val) {
    //     console.log('search:', val);
    // }

    const handleDatePickerChange = (date, dateString) => {
        const queryTempt = {
            ...query,
            ...fileHelpers.convertDateStringsToServerDateObject(dateString),
        };
        setQuery({ ...query, queryTempt });
        if (onQueryChange) onQueryChange(queryTempt);
    };

    // const handleLenghtText = (text) => {
    //     if (text.length > 14) {
    //         return text.substring(0, 15) + '...';
    //     }
    // };

    return (
        <div id='tabpane-media'>
            <Row gutter={[16, 8]}>
                <Col span={24}>
                    <Select
                        dropdownMatchSelectWidth={false}
                        optionLabelProp='label'
                        showSearch
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder='Người gửi'
                        optionFilterProp='children'
                        //onSearch={onSearch}
                        value={sender}
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
                        {members.map((memberEle, index) => (
                            <Option key={index} value={memberEle._id}>
                                <div className='option-item'>
                                    <div className='icon-user-item'>
                                        <PersonalIcon
                                            demention={24}
                                            avatar={memberEle.avatar}
                                        />
                                    </div>

                                    <div className='name-user-item'>
                                        {memberEle.name}
                                    </div>
                                </div>
                            </Option>
                        ))}
                    </Select>
                </Col>
                {/* <Col span={12}>
                    <Select
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder='Ngày gửi'>
                        <Option value={1}>Trong vòng 1 tuần</Option>
                        <Option value={2}>Trong vòng 1 tháng</Option>
                        <Option value={3}>Trong vòng 3 tháng </Option>
                    </Select>
                </Col> */}

                <Col span={24}>
                    <RangeCalendarCustom
                        style={{ width: '100%' }}
                        onChange={handleDatePickerChange}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default TabPaneMedia;
