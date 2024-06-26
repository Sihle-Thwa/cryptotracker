import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Search } from '../../Backend/search';
import './searchbar.css';
import { Box, Card, IconButton, Typography, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onCoinSelect }) {
    const [query, setQuery] = useState('');
    const [searchedItem, setSearchedItem] = useState('');
    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);
    const [searchPressed, setSearchPressed] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        // perform search with query
    };

    const handleSearch = (event) => {
        setSearchedItem(event.target.value);
    };

    const handleSearchPress = () => {
        setSearchPressed(true);
    };

    const handleClose = () => {
        setCryptoData(null);
        setError(null);
    };

    useEffect(() => {
        if (searchPressed && searchedItem) {
            Search.fetchCryptoData(searchedItem)
                .then((data) => {
                    if (data) {
                        setCryptoData(data);
                        setError(null);
                    } else {
                        setCryptoData(null);
                        setError(`No crypto data found for search term "${searchedItem}"`);
                    }
                })
                .catch((error) => {
                    setError(error.message);
                    setCryptoData(null);
                });
            setSearchPressed(false);
        }
    }, [searchPressed, searchedItem]);

    const handleResultClick = (coin) => {
        onCoinSelect(coin);
        navigate(`/coinoverview/${coin.id}`, { state: { coin } });
    };

    return (
        <div className="input-wrapper">
            <input
                placeholder="Search coin..."
                value={searchedItem}
                onChange={handleSearch}
            />
            <button className="search-btn" onClick={handleSearchPress}>
                <FaSearch id="search-icon" />
            </button>
            {cryptoData && (
                <Card className="search-result">
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        mb={1}
                        padding={1}
                    >
                        <IconButton onClick={handleClose}>
                            <CloseIcon sx={{ cursor: 'pointer' }} />
                        </IconButton>
                    </Box>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        onClick={() => handleResultClick(cryptoData)}
                    >
                        <Link to={`/coinoverview/${cryptoData.id}`}>
                            <img
                                src={cryptoData.image}
                                alt={cryptoData.name}
                                width={20}
                                height={20}
                            />
                            <Typography>
                                {cryptoData.name}
                            </Typography>
                        </Link>
                    </Box>
                </Card>
            )}
            {
                error && (
                    <Card className="search-result">
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="flex-end"
                            mb={1}
                            padding={1}
                        >
                            <IconButton onClick={handleClose}>
                                <CloseIcon sx={{ cursor: 'pointer' }} />
                            </IconButton>
                        </Box>
                        <p>{error}</p>
                    </Card>
                )
            }
        </div>
    );
}

export default SearchBar;