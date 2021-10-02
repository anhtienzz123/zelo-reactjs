import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import GroupCard from '../GroupCard';
import { Row, Col } from 'antd';

ListGroup.propTypes = {

};

ListGroup.defaultProps = {

};



function ListGroup(props) {
    return (

        <Row gutter={[16, 16]}>
            <Col span={6} >
                <GroupCard />
            </Col>

            <Col span={6} >
                <GroupCard />
            </Col>

            <Col span={6} >
                <GroupCard />
            </Col>

            <Col span={6} >
                <GroupCard />
            </Col>

            <Col span={6} >
                <GroupCard />
            </Col>

            <Col span={6} >
                <GroupCard />
            </Col>

            <Col span={6} >
                <GroupCard />
            </Col>

            <Col span={6} >
                <GroupCard />
            </Col>

        </Row>

    );
}

export default ListGroup;