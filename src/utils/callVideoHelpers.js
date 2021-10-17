const callVideoHelpers = {
    // hiển thị stream bản thân
    setLocalStream(stream, mirrorMode = true) {
        // const localVidElem = document.getElementById('local');
        // localVidElem.srcObject = stream;
        // mirrorMode
        //     ? localVidElem.classList.add('mirror-mode')
        //     : localVidElem.classList.remove('mirror-mode');
    },

    userMediaAvailable() {
        return !!(
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia
        );
    },

    getUserFullMedia() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });
        } else {
            throw new Error('User media not available');
        }
    },

    getUserAudio() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                },
            });
        } else {
            throw new Error('User media not available');
        }
    },

    shareScreen() {
        if (this.userMediaAvailable()) {
            return navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: 'always',
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });
        } else {
            throw new Error('User media not available');
        }
    },

    getIceServer() {
        return {
            iceServers: [
                { urls: ['stun:hk-turn1.xirsys.com'] },
                {
                    username:
                        'ik-37V-lc5O7p-LYaR8Hp39EvjiL24W8LMy_V3M9tfowcnIUKMNTaxv167eZKwxWAAAAAGFr5rFUaWVuSHV5bmg=',
                    credential: 'fbcd7a58-2f28-11ec-8078-0242ac120004',
                    urls: [
                        'turn:hk-turn1.xirsys.com:80?transport=udp',
                        'turn:hk-turn1.xirsys.com:3478?transport=udp',
                        'turn:hk-turn1.xirsys.com:80?transport=tcp',
                        'turn:hk-turn1.xirsys.com:3478?transport=tcp',
                        'turns:hk-turn1.xirsys.com:443?transport=tcp',
                        'turns:hk-turn1.xirsys.com:5349?transport=tcp',
                    ],
                },
            ],
        };
    },

    replaceTrack(stream, recipientPeer) {
        let sender = recipientPeer.getSenders
            ? recipientPeer
                  .getSenders()
                  .find((s) => s.track && s.track.kind === stream.kind)
            : false;

        if (sender) sender.replaceTrack(stream);
    },
};

module.exports = callVideoHelpers;
