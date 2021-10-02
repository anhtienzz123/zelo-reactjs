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
                {
                    urls: ['stun:eu-turn4.xirsys.com'],
                },
                {
                    username:
                        'ml0jh0qMKZKd9P_9C0UIBY2G0nSQMCFBUXGlk6IXDJf8G2uiCymg9WwbEJTMwVeiAAAAAF2__hNSaW5vbGVl',
                    credential: '4dd454a6-feee-11e9-b185-6adcafebbb45',
                    urls: [
                        'turn:eu-turn4.xirsys.com:80?transport=udp',
                        'turn:eu-turn4.xirsys.com:3478?transport=tcp',
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
