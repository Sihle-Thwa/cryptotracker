import { React, useState } from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Nav, Container } from 'react-bootstrap';

function NavBar() {
    const [expand, updateExpand] = useState(false);

    return (
        <Navbar
            expanded={expand}
            fixed='top'
            expand='md'
        >
            <Container>
                <Navbar.Brand href='/' className='d-flex'>
                    CryptoTracker
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls='responsive-navbar-nav'
                    onClick={() => {
                        updateExpand(expand ? false : "expanded")
                    }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </Navbar.Toggle>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav className='ms-auto' defaultActiveKey='#home'>
                        <Nav.Item>
                            <Nav.Link as={Link} to='/' onClick={() => updateExpand(false)}>
                                <DashboardIcon style={{ marginBottom: '4px' }} />Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to='/articles' onClick={() => updateExpand(false)}>
                                <ArticleIcon style={{ marginBottom: '4px' }} />Articles
                            </Nav.Link>
                        </Nav.Item>

                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    )
}

export default NavBar;