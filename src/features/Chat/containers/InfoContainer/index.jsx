import React from 'react';
import PropTypes from 'prop-types';
import Scrollbars from 'react-custom-scrollbars';

InfoContainer.propTypes = {

};

function InfoContainer(props) {
    return (
        <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            autoHideDuration={200}
        >
            <div>
                <p>infoContainer</p>
            </div>
        </Scrollbars>
    );
}

export default InfoContainer;