import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import {
    Search

} from '../../Backend/search';
import { Link } from 'react-router-dom';
import './searchbar.css'
import _ from 'lodash';

function SearchBar() {
    const [searchedItem, setSearchedItem] = useState('');
    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = (event) => {
        setSearchedItem(event.target.value);
    };

    const debouncedFetchCryptoData = _.debounce((searchedItem) => {
        if (searchedItem) {
            Search.fetchCryptoData(searchedItem)
                .then((data) => {
                    if (data && data.length > 0) {
                        setCryptoData(data[0]);
                        setError(null);
                    }
                    else {
                        setCryptoData(null);
                        setError(`No crypto data found for search term "${searchedItem}"`)

                    }
                })
                .catch((error) => {
                    setError(error.message);
                    setCryptoData(null);
                });
        } else {
            setCryptoData(null);
            setError(null);
        }
    }, 500
    );


    useEffect(() => {
        debouncedFetchCryptoData(searchedItem);
    }, [searchedItem]);

    return (
        <div className='input-wrapper'>
            <FaSearch id='search-icon' />
            <input placeholder='Search coin...'
                value={searchedItem}
                onChange={handleSearch}
            />
            {
                cryptoData && (
                    <Link to={`/crpto/${cryptoData.id}`}>
                        <div className='search-result'>
                            <p> Name: {cryptoData.name}</p>
                            <p>Price: {cryptoData.price}</p>
                        </div>
                    </Link>
                )
            }
            {error && <p>Error: {error}</p>}

        </div>
    )
}

export default SearchBar;