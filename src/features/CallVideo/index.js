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

let socket = io(process.env.REACT_APP_API_URL, { transports: ['websocket'] });

function CallVideo(props) {
    const match = useRouteMatch();
    const { conversationId } = match.params;
    const { user } = useSelector((state) => state.global);
    const { _id } = user;
    const myStreamRef = useRef();
    const [myStream, setMyStream] = useState();
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
                call.answer(myStreamRef.current);
                call.on('stream', function (remoteStream) {
                    setCallerVideos([...callerVideos, remoteStream]);
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
            const call = peerRef.current.call(peerId, myStreamRef.current);
            call.on('stream', function (remoteStream) {
                setCallerVideos([...callerVideos, remoteStream]);
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
                    <MyVideo stream={myStreamRef.current} />
                )}
            </div>
            <Row className='user-videos'>
                {callerVideos.map((callerVideoEle) => (
                    <Col span={6}>
                        <MyVideo stream={callerVideoEle} />
                    </Col>
                ))}
            </Row>{' '}
        </div>
    );
}

export default CallVideo;
