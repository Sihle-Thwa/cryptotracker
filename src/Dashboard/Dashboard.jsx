import React from 'react';
import '../styles.css';
import { Container } from '@mui/material';
import Overview from '../Components/Overview.jsx';

function Dashboard() {

    return (
        <Container className='Dashboard-Wrapper'>
            <Container className='Dashboard-Content'>
                <h2> Dashboard</h2>
                <Container maxWidth="md" div>
                    <Overview />
                </Container>
            </Container>
        </Container>
    )
}

export default Dashboard;