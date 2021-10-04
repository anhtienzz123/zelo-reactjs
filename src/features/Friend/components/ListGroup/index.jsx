import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import GroupCard from '../GroupCard';
import { Row, Col } from 'antd';

ListGroup.propTypes = {
    data: PropTypes.array,
};

ListGroup.defaultProps = {
    data: []
};



function ListGroup({ data }) {
    return (

        <Row gutter={[16, 16]}>
            {data && data.length > 0 && (
                data.map((ele, index) => (
                    <Col span={6} >
                        <GroupCard
                            data={ele}
                            key={index}
                        />
                    </Col>
                )))}

        </Row>

    );
}

export default ListGroup;