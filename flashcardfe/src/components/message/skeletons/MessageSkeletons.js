import React from 'react';
import { Placeholder, Row, Col } from 'react-bootstrap';

const MessageSkeleton = () => {
    return (
        <>
            <Row className="align-items-center mb-2">
                <Col xs="auto">
                    <Placeholder as="div" animation="glow" className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                        <Placeholder xs={1} />
                    </Placeholder>
                </Col>
                <Col>
                    <Placeholder as="div" animation="glow" className="mb-1">
                        <Placeholder xs={4} />
                    </Placeholder>
                    <Placeholder as="div" animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                </Col>
            </Row>
            <Row className="align-items-center justify-content-end mb-2">
                <Col xs="auto">
                    <Placeholder as="div" animation="glow" className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                        <Placeholder xs={1} />
                    </Placeholder>
                </Col>
                <Col>
                    <Placeholder as="div" animation="glow">
                        <Placeholder xs={4} />
                    </Placeholder>
                </Col>
            </Row>
        </>
    );
};

export default MessageSkeleton;
