import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import './searchbar.css'

function SearchBar() {
    const [input, setInput] = useState("");
    const [cryptoData, setCryptoData] = useState(null);

    async function search() {

        const id = input.toLowerCase().replace(' ', '-');
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-dM17N6ui7skmJrhbqmjuQRMt',

            },
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&ids=${id}`
                , options);
            const data = await response.json();
            console.log(data)

            if (data.length > 0) {
                setCryptoData({
                    name: data[0].name,
                    price: data[0].current_price
                });
            } else {
                setCryptoData(null);
            }

            //Load or add the pag that shows the information of the selected crypto using prop (ID)

        } catch (error) {
            console.log(error)
            setCryptoData(null);

        }
    };

    const handleChange = (value) => {
        setInput(value);

    }

    return (
        <div className='input-wrapper'>
            <FaSearch id='search-icon' />
            <input placeholder='Search coin...'
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                onKeyUpCapture={(e) => {
                    if (e.key === 'Enter') {
                        search();
                    }
                }}
            />
            {
                cryptoData && (
                    <div className='search-result'>
                        <p> Name: {cryptoData.name}</p>
                        <p>Price: {cryptoData.price}</p>
                    </div>
                )
            }

        </div>
    )
}

export default SearchBar