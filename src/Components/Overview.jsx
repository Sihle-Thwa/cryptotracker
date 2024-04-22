import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import CoinTable from './CoinTable';
import CoinCards from './CoinCards';
import Articles from '../Articles/Articles';


function Overview() {

    return (
        <Container className='Overview-Wrapper'>
            <Row>
                <Col>
                    <CoinCards />
                </Col>
            </Row>
            <CoinTable />
        </Container>
    )
}

export default Overview