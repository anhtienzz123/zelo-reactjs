import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import h from 'utils/callVideoHelpers';
import { useRouteMatch } from 'react-router';
import { useSelector } from 'react-redux';
import ActionNavbar from './components/ActionNavbar';
import MyVideo from './components/MyVideo';
import { Col, Row } from 'antd';
import './style.scss';
import peerjs from 'peerjs';
import Peer from 'peerjs';

CallVideo.propTypes = {};

let socket = io(process.env.REACT_APP_SOCKET_URL, {
    transports: ['websocket'],
});

function CallVideo(props) {
    const match = useRouteMatch();
    const { conversationId } = match.params;
    const { user } = useSelector((state) => state.global);
    const { _id } = user;
    const myStreamRef = useRef();
    const [myStream, setMyStream] = useState(null);
    const peerRef = useRef(new Peer());
    const peerIdRef = useRef('');
    const [callerVideos, setCallerVideos] = useState([]);

    const handleToggleVideo = () => {};

    const handleToggleAudio = () => {};

    useEffect(() => {
        if (_id) {
            peerRef.current.on('open', function (id) {
                console.log('My peer ID is: ' + id);
                peerIdRef.current = id;

                socket.emit('subscribe-call-video', {
                    conversationId,
                    newUserId: _id,
                    peerId: id,
                });
            });

            peerRef.current.on('call', function (call) {
                console.log('nhan duoc call');

                let streamTempt = myStreamRef.current;

                if (!myStreamRef.current) streamTempt = h.getEmptyMedia();

                call.answer(streamTempt);
                const senderId = call.metadata.userId;
                call.on('stream', function (remoteStream) {
                    setCallerVideos((pre) => [
                        ...pre.filter((preEle) => preEle.userId != senderId),
                        { userId: senderId, stream: remoteStream },
                    ]);
                });
            });
        }

        h.getUserFullMedia().then((stream) => {
            myStreamRef.current = stream;
            setMyStream(stream);
        });
    }, []);

    useEffect(() => {
        socket.on('new-user-call', ({ conversationId, newUserId, peerId }) => {
            console.log('new-user-call: ', newUserId, peerId);
            console.log('myStream: ', myStreamRef.current);

            let streamTempt = myStreamRef.current;

            if (!myStreamRef.current) streamTempt = h.getEmptyMedia();

            const call = peerRef.current.call(peerId, streamTempt, {
                metadata: {
                    userId: _id,
                },
            });

            call.on('stream', function (remoteStream) {
                console.log('remoteStream: ', remoteStream);
                setCallerVideos((pre) => [
                    ...pre.filter((preEle) => preEle.userId != newUserId),
                    { userId: newUserId, stream: remoteStream },
                ]);
            });
        });
    }, []);

    return (
        <div id='call-video'>
            <ActionNavbar
                onToggleVideo={handleToggleVideo}
                onToggleAudio={handleToggleAudio}
            />
            <div className='local-video'>
                {myStreamRef.current && (
                    <MyVideo stream={myStreamRef.current} userId='dsdsadsa' />
                )}
            </div>
            <Row className='user-videos'>
                {callerVideos.map((callerVideoEle) => (
                    <Col span={6}>
                        <MyVideo
                            stream={callerVideoEle.stream}
                            userId={callerVideoEle.userId}
                        />
                    </Col>
                ))}
            </Row>{' '}
        </div>
    );
}

export default CallVideo;
