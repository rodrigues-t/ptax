import React, { memo } from "react";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Spinner = () => {
    return (
        <Row>
            <Col className="text-center">
                <FontAwesomeIcon icon="spinner" size="3x" color="grey" spin />
            </Col>
        </Row>
    );
}

export default memo(Spinner);