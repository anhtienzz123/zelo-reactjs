const COVERSATION_STYLE = {
    styleGroup3: {
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)'
    },

    styleGroup2: {
        display: 'flex',
        alignItems: 'center',
    },

    friendCardAvatar: (size) => {
        const demesion = size * 2 - 8;
        return {
            height: `${demesion}px`,
            width: `${demesion}px`,
        }
    },
    friendCardAvatarMixStyle2: (size) => {
        const demesion = size * 2 - 8;
        return {
            display: 'flex',
            alignItems: 'center',
            height: `${demesion}px`,
            width: `${demesion}px`,
        }
    }
}

export default COVERSATION_STYLE