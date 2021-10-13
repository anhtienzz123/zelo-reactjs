import { Col, Row } from 'antd'
import NotFoundPage from 'components/NotFoundPage'
import Chat from 'features/Chat'
import {
    addMessage,
    fetchConversationById,
    fetchListClassify,
    fetchListColor,
    fetchListConversations,
    setNumberUnreadForNewFriend,
    updateConversationWhenAddMember,
    updateMemberLeaveGroup,
} from 'features/Chat/chatSlice'
import NavbarContainer from 'features/Chat/containers/NavbarContainer'
import Friend from 'features/Friend'
import {
    fetchFriends,
    fetchListGroup,
    fetchListMyRequestFriend,
    fetchListRequestFriend,
} from 'features/Friend/friendSlice'
import useWindowUnloadEffect from 'hooks/useWindowUnloadEffect'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { init, socket } from 'utils/socketClient'
init()

function ChatLayout(props) {
    const { url } = useRouteMatch()
    const dispatch = useDispatch()
    const { conversations } = useSelector((state) => state.chat)
    const { isJoinChatLayout, user } = useSelector((state) => state.global)
    const [idNewMessage, setIdNewMessage] = useState('')

    useEffect(() => {
        return () => {
            socket.close()
        }
    }, [])

    useEffect(() => {
        dispatch(fetchListRequestFriend())
    }, [])

    useEffect(() => {
        dispatch(fetchListMyRequestFriend())
    }, [])

    useEffect(() => {
        dispatch(
            fetchFriends({
                name: '',
            })
        )
    }, [])

    useEffect(() => {
        dispatch(
            fetchListGroup({
                name: '',
                type: 2,
            })
        )
    }, [])

    useEffect(() => {
        dispatch(fetchListClassify())
    }, [])

    useEffect(() => {
        dispatch(fetchListColor())
    }, [])

    useEffect(() => {
        dispatch(fetchListConversations({}))
    }, [])

    useEffect(() => {
        const userId = user._id
        if (userId) socket.emit('join', userId)
    }, [user])

    useEffect(() => {
        if (conversations.length === 0) return

        const conversationIds = conversations.map(
            (conversationEle) => conversationEle._id
        )
        socket.emit('join-conversations', conversationIds)
    }, [conversations])

    useEffect(() => {
        socket.on('create-individual-conversation', (converId) => {
            socket.emit('join-conversation', converId)
            dispatch(fetchConversationById({ conversationId: converId }))
        })
    }, [])

    useEffect(() => {
        socket.on(
            'create-individual-conversation-when-was-friend',
            (conversationId) => {
                dispatch(fetchConversationById({ conversationId }))
                console.log('hai nguoi la')
            }
        )
    }, [])

    useEffect(() => {
        socket.on('new-message', (conversationId, newMessage) => {
            const { type, content, manipulatedUsers } = newMessage

            // nếu nottify đã là bạn bè, thì

            console.log('new friend', conversationId, newMessage)

            if (type === 'NOTIFY' && content === 'Đã thêm vào nhóm') {
                dispatch(
                    updateConversationWhenAddMember({
                        newMembers: manipulatedUsers,
                        conversationId,
                    })
                )
            }

            if (type === 'NOTIFY' && content === 'Đã là bạn bè') {
                console.log('chạy')
                // dispatch(setNumberUnreadForNewFriend(conversationId))
            }

            if (type === 'NOTIFY' && content === 'Đã rời khỏi nhóm') {
                dispatch(
                    updateMemberLeaveGroup({
                        conversationId,
                        newMessage,
                    })
                )
            }

            dispatch(addMessage(newMessage))
            setIdNewMessage(newMessage._id)
        })

        socket.on('create-conversation', (conversationId) => {
            console.log('tạo nhóm', conversationId)
            dispatch(fetchConversationById({ conversationId }))
        })
    }, [])

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    useWindowUnloadEffect(async () => {
        async function leaveApp() {
            socket.emit('leave', user._id)
            await sleep(2000)
        }

        await leaveApp()
    }, true)

    return (
        <div>
            {/* <button onClick={leaveApp} >test scoket</button> */}
            <Row gutter={[0, 0]}>
                <Col span={1}>
                    <NavbarContainer />
                </Col>
                <Col span={23}>
                    <Switch>
                        <Route
                            exact
                            path={url}
                            render={(props) => (
                                <Chat
                                    {...props}
                                    socket={socket}
                                    authed={true}
                                    idNewMessage={idNewMessage}
                                />
                            )}
                        />

                        <Route
                            exact
                            path={`${url}/friends`}
                            render={(props) => (
                                <Friend
                                    {...props}
                                    socket={socket}
                                    authed={true}
                                />
                            )}
                        />

                        <Route component={NotFoundPage} />
                    </Switch>
                </Col>
            </Row>
        </div>
    )
}

export default ChatLayout
