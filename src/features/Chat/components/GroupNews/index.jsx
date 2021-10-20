import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import InfoTitle from '../InfoTitle'
import Scrollbars from 'react-custom-scrollbars'
import { Tabs } from 'antd'
import { BarChartOutlined, NumberOutlined, PushpinOutlined } from '@ant-design/icons'

GroupNews.propTypes = {
    onBack: PropTypes.func,
}
GroupNews.defaultProps = {
    onBack: null,
}

function GroupNews({ onBack }) {
    const { TabPane } = Tabs

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
                        <Tabs defaultActiveKey="1">
                            <TabPane
                                tab={
                                    <span>
                                        <PushpinOutlined />
                                        Tin ghim
                                    </span>
                                }
                                key="1"
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
                                key="2"
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
                                key="3"
                            >
                                Tab 3
                            </TabPane>
                        </Tabs>

                    </div>
                </div>
            </Scrollbars>
        </div>
    )
}

export default GroupNews
