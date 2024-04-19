import React from 'react'
import '../styles.css'
import { Container, Col, Row } from '@mui/material'
import Overview from '../Components/Overview'
function Dashboard() {
    return (
        <Container className='Dashboard-Wrapper'>
            <h1 className='DashboardHeader'>CryptoTracker</h1>
            <Container className='Dashboard-Content'>
                <h2> Dashboard</h2>
                <Container maxWidth="md" div>

                    <Overview />

                </Container>

            </Container>

        </Container>
    )
}

export default Dashboard