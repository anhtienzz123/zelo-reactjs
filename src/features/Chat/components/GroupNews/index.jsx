import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import InfoTitle from '../InfoTitle'
import Scrollbars from 'react-custom-scrollbars'
import { Tabs } from 'antd'
import { BarChartOutlined, NumberOutlined, PushpinOutlined } from '@ant-design/icons'
import ListChannel from '../ListChannel'

GroupNews.propTypes = {
    onBack: PropTypes.func,
    tabActive: PropTypes.number,
}
GroupNews.defaultProps = {
    onBack: null,
    tabActive: 0
}

function GroupNews({ onBack, tabActive, onChange }) {
    const { TabPane } = Tabs


    const handleChangeActiveKey = (key) => {
        if (onChange) {
            onChange(key)
        }

    }
    return (
        <div className="group-news_wrapper">
            <div className="group-news_header">
                <InfoTitle
                    isBack={true}
                    text="Bảng tin nhóm"
                    onBack={onBack}
                    type="broadcast"
                />
            </div>
            <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                autoHideDuration={200}
                style={{
                    width: '100%',
                    height: 'calc(100vh - 68px)',
                }}
            >
                <div className="group-news_body">
                    <div className="group-news_tabpane">
                        <Tabs
                            activeKey={tabActive.toString()}
                            onChange={handleChangeActiveKey}

                        >
                            <TabPane
                                tab={
                                    <span>
                                        <PushpinOutlined />
                                        Tin ghim
                                    </span>
                                }
                                key='0'
                            >

                                Tab 1
                            </TabPane>
                            <TabPane
                                tab={
                                    <span>
                                        <BarChartOutlined />
                                        Bình chọn
                                    </span>
                                }
                                key='1'
                            >
                                Tab 2
                            </TabPane>

                            <TabPane
                                tab={
                                    <span>
                                        <NumberOutlined />
                                        Kênh
                                    </span>
                                }
                                key='2'
                            >
                                <ListChannel />
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
            </Scrollbars>
        </div>
    )
}

export default GroupNews
