import React, { useEffect, useState } from 'react';
import { fetchAllCoins } from '../Backend/api';

function CoinCards() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchAllCoins();
            setCoins(data);
        };
        fetchData();
    }, []);
    return (
        <div>
            {coins.slice(0, 6).map((coin) => (
                <div key={coin.id} className='coin-card'>
                    <img src={coin.image} alt={coin.name} />
                    <h2>{coin.name}</h2>
                    <p>R{coin.current_price}</p>

                </div>
            ))}

        </div>
    )
}

export default CoinCards