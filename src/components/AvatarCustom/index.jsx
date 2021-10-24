import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Tooltip } from 'antd';
import getSummaryName from 'utils/nameHelper'

AvatarCustom.propTypes = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object,
    demention: PropTypes.number,
    size: PropTypes.number,
};


AvatarCustom.defaultProps = {
    src: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: {}
};




function AvatarCustom(props) {

    const { src, name, style, ...rest } = props;




    return (
        <>
            {
                src ? (
                    <Avatar
                        {...props}
                    />
                ) : (
                    <Tooltip
                        title={name}
                        placement="top"

                    >
                        <Avatar
                            style={{ backgroundColor: '#408ec6', ...style }}
                            {...rest}
                        >
                            {getSummaryName(name)}
                        </Avatar>
                    </Tooltip>
                )
            }
        </>
    );
}

export default AvatarCustom;