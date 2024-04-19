import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import CoinTable from './CoinTable';
import CoinCards from './CoinCards';


function Overview() {

    return (
        <Container className='Overview-Wrapper'>
            <Row>
                <Col>
                    <CoinCards />
                </Col>
                <Col>
                </Col>
            </Row>
            <CoinTable />
        </Container>
    )
}

export default Overview