import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import {
    Search
} from '../../Backend/search';
import { Link } from 'react-router-dom';
import './searchbar.css'

function SearchBar() {
    const [searchedItem, setSearchedItem] = useState('');
    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);
    const [searchPressed, setSearchPressed] = useState(false);

    const handleSearch = (event) => {
        setSearchedItem(event.target.value);
    };

    const handleSearchPress = () => {
        setSearchPressed(true);
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

    return (
        <div className='input-wrapper'>
            <FaSearch id='search-icon' />
            <input placeholder='Search coin...'
                value={searchedItem}
                onChange={handleSearch}
            />
            <button onClick={handleSearchPress}>Search</button>

            {
                cryptoData && (
                    <Link to={`/crypto/${cryptoData.id}`}>
                        <div className='search-result'>
                            <p> Name: {cryptoData.name}</p>
                            <p>Price: {cryptoData.current_price}</p>
                        </div>
                    </Link>
                )
            }
            {error && <p>Error: {error}</p>}

        </div>

    )
}

export default SearchBar;