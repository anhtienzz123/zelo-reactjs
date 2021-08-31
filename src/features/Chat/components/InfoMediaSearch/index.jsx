import React from 'react';
import PropTypes from 'prop-types';
import InfoTitle from '../InfoTitle';
import { Tabs } from 'antd';
import './style.scss';
import TabPaneMedia from '../TabPaneMedia';
import TabPaneFile from '../TabPaneFile';
InfoMediaSearch.propTypes = {
    onBack: PropTypes.func,
};
InfoMediaSearch.defaultProps = {
    onBack: null,
};

function InfoMediaSearch(props) {
    const { onBack } = props;
    const { TabPane } = Tabs;

    const handleOnBack = (value) => {
        if (onBack) {
            onBack(value);
        }
    }

    return (
        <div id='info_media-search'>
            <div className="info_media-search--title">
                <InfoTitle
                    isBack={true}
                    text="Kho lưu trữ"
                    onBack={handleOnBack}
                />
            </div>

            <div className='info_media-search--tabpane'>
                <Tabs defaultActiveKey="1" size='middle' >
                    <TabPane tab="Ảnh/Video" key="1">
                        <TabPaneMedia />
                    </TabPane>
                    <TabPane tab="File" key="2">
                        <TabPaneFile />
                    </TabPane>

                </Tabs>

            </div>
        </div>
    );
}

export default InfoMediaSearch;