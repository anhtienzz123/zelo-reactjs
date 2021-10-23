import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

MyVideo.propTypes = {
    stream: PropTypes.object,
};

function MyVideo({ stream }) {
    const ref = useRef({ srcObject: '' });

    useEffect(() => {
        if (stream) ref.current.srcObject = stream;
    }, []);

    return (
        <video
            //class='local-video mirror-mode'
            // id='local'
            ref={ref}
            volume="0"
            style={{ width: '100%' }}
            autoPlay
            muted
        ></video>
    );
}

export default MyVideo;
