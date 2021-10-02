import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router';

StickerPage.propTypes = {};

function StickerPage(props) {
    const match = useRouteMatch();

    const { id } = match.params;

    return <div>sticker page{id}</div>;
}

export default StickerPage;
