import React from 'react'
import { Container } from 'react-bootstrap';
import CoinTable from './CoinTable';
import CoinCards from './CoinCards';
import './overview.css'


function Overview() {

    return (
        <Container className='Overview-Wrapper'>
            <CoinCards />
            <CoinTable />
        </Container>
    )
}

export default Overview