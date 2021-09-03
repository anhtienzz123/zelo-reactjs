import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

DividerCustom.propTypes = {
    dateString: PropTypes.object,
};

function DividerCustom({ dateString }) {
    const date = new Date(dateString);

    return (
        <div id='divider-custom'>
            <div className='divider-custom_bar'></div>
            <div className='divider-custom_info'>
                <div className='divider-custom_info--time'>
                    <span>
                        {date.getHours()}:{date.getMinutes()}
                    </span>
                </div>

                <div className='divider-custom_info--date'>
                    <span>
                        {date.getDate()}/{date.getMonth() + 1}/
                        {date.getFullYear()}
                    </span>
                </div>
            </div>
            <div className='divider-custom_bar'></div>
        </div>
    );
}

export default DividerCustom;
