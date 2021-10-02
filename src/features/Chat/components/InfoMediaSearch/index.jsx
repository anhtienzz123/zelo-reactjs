import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InfoTitle from '../InfoTitle';
import { Tabs } from 'antd';
import './style.scss';
import TabPaneMedia from '../TabPaneMedia';
import TabPaneFile from '../TabPaneFile';
import Scrollbars from 'react-custom-scrollbars';
import ContentTabPaneMedia from '../ContentTabPaneMedia';
import ContentTabPaneFile from '../ContentTabPaneFile';

InfoMediaSearch.propTypes = {
    onBack: PropTypes.func,
};
InfoMediaSearch.defaultProps = {
    onBack: null,
};

function InfoMediaSearch(props) {
    const { onBack } = props;
    const { TabPane } = Tabs;
    const [activeKey, setActiveKey] = useState("1")

    const handleOnBack = (value) => {
        if (onBack) {
            onBack(value);
        }
    }

    const handleChangeTab = (activeKey) => {
        setActiveKey(activeKey)
    }

    return (
        <div id='info_media-search'>
            <div className="info_media-search--title">
                <InfoTitle
                    isBack={true}
                    text="Kho lưu trữ"
                    onBack={handleOnBack}
                    isSelected={true}
                />
            </div>



            <div className='info_media-search--tabpane'>


                <Tabs defaultActiveKey={activeKey} size='middle' onChange={handleChangeTab} >
                    <TabPane tab="Ảnh/Video" key="1">
                        <TabPaneMedia />
                    </TabPane>
                    <TabPane tab="File" key="2">
                        <TabPaneFile />
                    </TabPane>

                </Tabs>

            </div>

            <div className="info_media-search-content">
                <Scrollbars
                    autoHide={true}
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    style={{ width: '100%' }}
                    height="100%"


                >
                    {activeKey === '1'
                        ? <ContentTabPaneMedia />
                        : <ContentTabPaneFile />
                    }


                </Scrollbars>

            </div>
        </div>
    );
}

export default InfoMediaSearch;