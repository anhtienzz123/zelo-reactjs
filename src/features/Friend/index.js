import { CaretDownOutlined, FilterOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Menu, Row } from 'antd'
import ICON_FRIEND from 'assets/images/icon/icon_friend.png'
import ICON_GROUP from 'assets/images/icon/icon_group.png'
import { getValueFromKey } from 'constants/filterFriend'
import SearchContainer from 'features/Chat/containers/SearchContainer'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { useDispatch, useSelector } from 'react-redux'
import { sortGroup } from 'utils/groupUtils'
import HeaderFriend from './components/HeaderFiend'
import ListFriend from './components/ListFriend'
import ListGroup from './components/ListGroup'
import ListMyFriendRequest from './components/ListMyRequestFriend'
import ListRequestFriend from './components/ListRequestFriend'

import {
    fetchFriends,
    fetchListGroup,
    fetchListMyRequestFriend,
    fetchListRequestFriend,
} from './friendSlice'
import FRIEND_STYLE from './friendStyle'
import './style.scss'

Friend.propTypes = {
    socket: PropTypes.object,
}

Friend.defaultProps = {
    socket: {},
}

function Friend({ socket }) {
    const { requestFriends, myRequestFriend, groups, friends } = useSelector(
        (state) => state.friend
    )
    const { user } = useSelector((state) => state.global)

    const { isJoinFriendLayout } = useSelector((state) => state.global)
    const [subTab, setSubTab] = useState(0)
    const [currentFilterLeft, setCurrentFilterLeft] = useState('1')
    const [currentFilterRight, setCurrentFilterRight] = useState('1')
    const [groupCurrent, setGroupCurrent] = useState([])
    const [keySort, setKeySort] = useState(1)
    const dispatch = useDispatch()
    const refFiller = useRef()

    useEffect(() => {
        if (groups.length > 0) {
            const temp = sortGroup(groups, 1)
            setGroupCurrent(temp)
            refFiller.current = temp
        }
    }, [groups])

    useEffect(() => {
        dispatch(fetchListRequestFriend())
        dispatch(fetchListMyRequestFriend())
        dispatch(
            fetchFriends({
                name: '',
            })
        )
        dispatch(fetchListGroup({ name: '', type: 2 }))
    }, [])

    const handleMenuLeftSelect = ({ _, key }) => {
        setCurrentFilterLeft(key)
        if (key === '2') {
            const newGroup = groupCurrent.filter(
                (ele) => ele.leaderId === user._id
            )

            setGroupCurrent(newGroup)
        }
        if (key === '1') {
            console.log(refFiller.current)
            setGroupCurrent(sortGroup(refFiller.current, keySort))
        }
    }

    const handleMenuRightSelect = ({ _, key }) => {
        setCurrentFilterRight(key)
        let newGroup = []
        if (key === '2') {
            newGroup = sortGroup(groupCurrent, 0)
            setKeySort(0)
        }
        if (key === '1') {
            newGroup = sortGroup(groupCurrent, 1)
            setKeySort(1)
        }

        setGroupCurrent(newGroup)
    }

    const menuLeft = (
        <Menu onClick={handleMenuLeftSelect}>
            <Menu.Item key="1">Tất cả</Menu.Item>
            <Menu.Item key="2">Nhóm tôi quản lý</Menu.Item>
        </Menu>
    )

    const menuRight = (
        <Menu onClick={handleMenuRightSelect}>
            <Menu.Item key="1">Theo tên nhóm từ (A-Z)</Menu.Item>
            <Menu.Item key="2">Theo tên nhóm từ (Z-A)</Menu.Item>
        </Menu>
    )

    return (
        <div id="main-friend_wrapper">
            <Row gutter={[0, 0]}>
                <Col span={5}>
                    <div className="main-friend_sidebar">
                        <div className="main-friend_sidebar_search-bar">
                            <SearchContainer />
                        </div>

                        <div className="divider-layout">
                            <div></div>
                        </div>

                        <div className="main-friend_sidebar_bottom">
                            <div
                                className="main-friend_sidebar_option main-friend_sidebar_option--add-fiend"
                                onClick={() => setSubTab(0)}
                            >
                                <div className="main-friend_sidebar_option_img">
                                    <img src={ICON_FRIEND} alt="ICON_FRIEND" />
                                </div>

                                <div className="main-friend_sidebar_option_text">
                                    Danh sách kết bạn
                                </div>
                            </div>

                            <div
                                className="main-friend_sidebar_option main-friend_sidebar_option--groups"
                                onClick={() => setSubTab(1)}
                            >
                                <div className="main-friend_sidebar_option_img">
                                    <img src={ICON_GROUP} alt="ICON_GROUP" />
                                </div>

                                <div className="main-friend_sidebar_option_text">
                                    Danh sách nhóm
                                </div>
                            </div>

                            <div className="divider-layout">
                                <div></div>
                            </div>

                            <div className="main-friend_sidebar_list-friend">
                                <div className="main-friend_sidebar_list-friend_title">
                                    Bạn bè ({friends.length})
                                </div>
                                <ListFriend data={friends} />
                            </div>
                        </div>
                    </div>
                </Col>

                <Col span={19}>
                    <div className="main-friend_body">
                        <div className="main-friend_body__header">
                            <HeaderFriend />
                        </div>
                        <div className="main-friend_body__section">
                            <div className="main-friend_body_item">
                                <Scrollbars
                                    autoHide={true}
                                    autoHideTimeout={1000}
                                    autoHideDuration={200}
                                    style={{ height: '100%' }}
                                >
                                    {subTab ? (
                                        <>
                                            <div className="main-friend_body__filter">
                                                <div className="main-friend_body__filter--left">
                                                    <Dropdown
                                                        overlay={menuLeft}
                                                        placement="bottomLeft"
                                                    >
                                                        <Button
                                                            icon={
                                                                <CaretDownOutlined />
                                                            }
                                                            type="text"
                                                            style={
                                                                FRIEND_STYLE.BUTTON_FILTER
                                                            }
                                                        >
                                                            {` ${getValueFromKey(
                                                                'LEFT',
                                                                currentFilterLeft
                                                            )} (${
                                                                groupCurrent.length
                                                            })`}
                                                        </Button>
                                                    </Dropdown>
                                                </div>

                                                <div className="main-friend_body__filter--right">
                                                    <Dropdown
                                                        overlay={menuRight}
                                                        placement="bottomLeft"
                                                    >
                                                        <Button
                                                            icon={
                                                                <FilterOutlined />
                                                            }
                                                            type="text"
                                                            style={
                                                                FRIEND_STYLE.BUTTON_FILTER
                                                            }
                                                        >
                                                            {` ${getValueFromKey(
                                                                'RIGHT',
                                                                currentFilterRight
                                                            )}`}
                                                        </Button>
                                                    </Dropdown>
                                                </div>
                                            </div>

                                            <div className="main-friend_body__list-group">
                                                <ListGroup
                                                    data={groupCurrent}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="main-friend_body_list-request">
                                            <div className="main-friend_body_title-list">
                                                Lời mới kết bạn (
                                                {requestFriends.length})
                                            </div>
                                            <ListRequestFriend
                                                data={requestFriends}
                                            />

                                            <div className="main-friend_body_title-list">
                                                Đã gửi yêu cầu kết bạn (
                                                {myRequestFriend.length})
                                            </div>
                                            <ListMyFriendRequest
                                                data={myRequestFriend}
                                            />
                                        </div>
                                    )}
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Friend
