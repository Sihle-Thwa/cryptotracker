import React, { useState } from 'react';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link, NavLink } from 'react-router-dom';
import { BiMenu } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import './navbar.css';
import SearchBar from '../searchBar/SearchBar.jsx';
import CoinOverview from '../CoinOverview.jsx';

function Navbar() {
    const [expand, setExpand] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);

    const handleCoinSelect = (coin) => {
        setSelectedCoin(coin);
    };

    const handleExpand = () => {
        setExpand(!expand);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <NavLink exact to="/" className="nav-logo">
                    <span>CT</span>
                </NavLink>
                <div className="search-bar-container">
                    <SearchBar onCoinSelect={handleCoinSelect} />

                </div>
                <ul className={expand ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <NavLink
                            exact
                            to="/"
                            activeClassName="active"
                            className="nav-links"
                            onClick={handleExpand}
                        >
                            <DashboardIcon /> Overview
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            to="/articles"
                            activeClassName="active"
                            className="nav-links"
                            onClick={handleExpand}
                        >
                            <ArticleIcon /> Articles
                        </NavLink>
                    </li>
                </ul>
                <div className="nav-icon" onClick={handleExpand}>
                    {expand ? (
                        <span className="icon">
                            <IoMdClose />
                        </span>
                    ) : (
                        <span className="icon">
                            <BiMenu />{' '}
                        </span>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;