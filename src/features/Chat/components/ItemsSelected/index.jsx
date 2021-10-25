import { CloseCircleFilled } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import PersonalIcon from '../PersonalIcon';
import './style.scss';
ItemsSelected.propTypes = {
    items: PropTypes.array,
};

ItemsSelected.defaultProps = {
    items: [],
};

function ItemsSelected({ items, onRemove }) {


    const handleRemoveSelect = (id) => {
        if (onRemove) {
            onRemove(id);
        }
    };

    return (
        <>
            {

                items && items.length > 0 &&
                items.map((item, index) => (
                    <div className='item-selected--text' key={index}>
                        <div className='item-selected-avatar'>
                            <PersonalIcon
                                demention={20}
                                avatar={item.avatar}
                                name={item.name}
                            />
                        </div>

                        <div className='item-selected-name'>
                            <span>{item.name}</span>
                        </div>


                        <div className='item-selected-remove' onClick={() => handleRemoveSelect(item._id)}>
                            <CloseCircleFilled />
                        </div>
                    </div>
                ))
            }

        </>

    );
}

export default ItemsSelected;