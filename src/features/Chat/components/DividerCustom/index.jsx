import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

DividerCustom.propTypes = {

};

function DividerCustom(props) {
    return (
        <div id='divider-custom'>
            <div className="divider-custom_bar"></div>
            <div className="divider-custom_info">
                <div className="divider-custom_info--time">
                    <span>14:30</span>
                </div>

                <div className="divider-custom_info--date">
                    <span>20/08/2021</span>
                </div>
            </div>
            <div className="divider-custom_bar"></div>
        </div>
    );
}

export default DividerCustom;