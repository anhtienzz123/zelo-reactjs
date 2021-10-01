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

CallVideo.propTypes = {};

let socket = io(process.env.REACT_APP_API_URL, { transports: ['websocket'] });

function CallVideo(props) {
    const match = useRouteMatch();
    const { conversationId } = match.params;
    const { user } = useSelector((state) => state.global);
    const { _id } = user;

    const pcRef = useRef([]);
    const pc = pcRef.current;
    const [myStream, setMyStream] = useState(null);
    const [userStreams, setUserStreams] = useState([]);
    const [isVideo, setIsVideo] = useState(true);
    const [isAudio, setIsAudio] = useState(true);

    // khởi tạo kết nối
    const init = async (createOffer, partnerName) => {
        // tạo kết nối giữa 2 thằng
        pc[partnerName] = new RTCPeerConnection(h.getIceServer());

        if (myStream) {
            myStream.getTracks().forEach((track) => {
                pc[partnerName].addTrack(track, myStream); //should trigger negotiationneeded event
            });
        } else {
            h.getUserFullMedia()
                .then((stream) => {
                    //save my stream
                    setMyStream(stream);

                    stream.getTracks().forEach((track) => {
                        pc[partnerName].addTrack(track, stream); //should trigger negotiationneeded event
                    });

                    h.setLocalStream(stream);
                })
                .catch((e) => {
                    console.error(`stream error: ${e}`);
                });
        }

        //create offer
        if (createOffer) {
            pc[partnerName].onnegotiationneeded = async () => {
                let offer = await pc[partnerName].createOffer();

                await pc[partnerName].setLocalDescription(offer);

                socket.emit('sdp', {
                    description: pc[partnerName].localDescription,
                    to: partnerName,
                    sender: _id,
                });
            };
        }

        //send ice candidate to partnerNames
        pc[partnerName].onicecandidate = ({ candidate }) => {
            socket.emit('ice candidates', {
                candidate: candidate,
                to: partnerName,
                sender: _id,
            });
        };
        //add
        // lấy stream thằng này để hiển thị
        pc[partnerName].ontrack = (e) => {
            let str = e.streams[0];

            const index = userStreams.findIndex(
                (userEle) => userEle.userId == partnerName
            );
            // nếu có rồi thì thay đổi, không có thì tạo ra
            if (index !== -1) userStreams[index].stream = str;
            else userStreams.push({ userId: partnerName, stream: str });
        };

        // lắng nghe sự kiện thằng khác làm gì
        pc[partnerName].onconnectionstatechange = (d) => {
            console.log(
                `status ${partnerName}: `,
                pc[partnerName].iceConnectionState
            );
            switch (pc[partnerName].iceConnectionState) {
                case 'disconnected':
                case 'failed':
                case 'closed':
                    closeVideo(partnerName);
                    break;
            }
        };

        pc[partnerName].onsignalingstatechange = (d) => {
            switch (pc[partnerName].signalingState) {
                case 'closed':
                    console.log("Signalling state is 'closed'");
                    closeVideo(partnerName);
                    break;
            }
        };
    };

    const broadcastNewTracks = (stream, type, mirrorMode = true) => {
        let track =
            type == 'audio'
                ? stream.getAudioTracks()[0]
                : stream.getVideoTracks()[0];

        for (let p in pc) {
            let pName = pc[p];

            if (typeof pc[pName] == 'object') {
                h.replaceTrack(track, pc[pName]);
            }
        }
    };

    const closeVideo = (userId) => {
        const userStreamsTempt = userStreams.filter(
            (userStreamEle) => userStreamEle.userId != userId
        );
        setUserStreams(userStreamsTempt);
    };

    useEffect(() => {
        socket.emit('join', _id);
        socket.emit('join-conversation', conversationId);
        h.getUserFullMedia()
            .then((stream) => {
                setMyStream(stream);
            })
            .catch((e) => {
                console.error(`stream error: ${e}`);
            });
    }, []);

    useEffect(() => {
        socket.emit('subscribe-call-video', conversationId, _id);

        // thằng cũ khởi tạo video thằng mới vào
        socket.on('new user', (newUserId) => {
            // bắn lại id của mình cho thằng mới vào
            console.log('new-user', newUserId);
            socket.emit('newUserStart', {
                to: newUserId,
                sender: _id,
            });
            pc.push(newUserId);
            // khởi tạo video của thằng mới vào
            init(true, newUserId);
        });

        // thằng mới vào khởi tạo video thằng cũ
        socket.on('newUserStart', (senderId) => {
            console.log('newUserStart: ', senderId);
            pc.push(senderId);
            init(false, senderId);
        });

        socket.on('ice candidates', async (data) => {
            handleIceCandidate(data);
        });

        // gởi offer => trả lại answer => kết nối
        socket.on('sdp', (data) => {
            handleSDP(data);
        });
    }, []);

    const handleIceCandidate = async (data) => {
        if (data.candidate) {
            await pc[data.sender].addIceCandidate(
                new RTCIceCandidate(data.candidate)
            );
        }
    };

    const handleSDP = async (data) => {
        if (data.description.type === 'offer') {
            // để bắt tay với nhau
            if (data.description) {
                await pc[data.sender].setRemoteDescription(
                    new RTCSessionDescription(data.description)
                );
            }

            h.getUserFullMedia()
                .then(async (stream) => {
                    setMyStream(stream);

                    stream.getTracks().forEach((track) => {
                        pc[data.sender].addTrack(track, stream);
                    });

                    let answer = await pc[data.sender].createAnswer();

                    await pc[data.sender].setLocalDescription(answer);

                    socket.emit('sdp', {
                        description: pc[data.sender].localDescription,
                        to: data.sender,
                        sender: _id,
                    });
                })
                .catch((e) => {
                    console.error(e);
                });
        } else if (data.description.type === 'answer') {
            await pc[data.sender].setRemoteDescription(
                new RTCSessionDescription(data.description)
            );
            setUserStreams([...userStreams]);
        }
    };

    const handleToggleVideo = () => {
        if (myStream.getVideoTracks()[0].enabled) {
            myStream.getVideoTracks()[0].enabled = false;
            setIsVideo(false);
        } else {
            myStream.getVideoTracks()[0].enabled = true;
            setIsVideo(true);
        }

        broadcastNewTracks(myStream, 'video');
        setIsVideo(isVideo);
    };

    const handleToggleAudio = () => {
        if (myStream.getAudioTracks()[0].enabled) {
            myStream.getAudioTracks()[0].enabled = false;
        } else {
            myStream.getAudioTracks()[0].enabled = true;
        }

        broadcastNewTracks(myStream, 'video');
    };

    console.log('isVideo: ', isVideo);
    return (
        <div id='call-video'>
            <ActionNavbar
                onToggleVideo={handleToggleVideo}
                onToggleAudio={handleToggleAudio}
            />

            <div className='local-video'>
                {myStream && <MyVideo stream={myStream} />}
            </div>

            <Row className='user-videos'>
                {userStreams.map((userStreamEle) => (
                    <Col span={6}>
                        <MyVideo stream={userStreamEle.stream} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default CallVideo;
