import React, { useEffect, useState } from 'react'
import { fetchBottomCoins } from '../../Backend/api'
import './table.css'

function BottomCoinTable() {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const bottomCoins = async () => {
            const data = await fetchBottomCoins();

            setCoins(data);
        };
        bottomCoins();
    }, []);

    return (
        <table className='styled-table'>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Price (ZAR)</th>
                    <th>1h Price Change %</th>
                </tr>
            </thead>
            <tbody>
                {coins.map((coin, index) => (
                    <tr key={coin.id}>
                        <td>{index + 1}</td>
                        <td>{coin.name}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.current_price.toFixed(2)}</td>
                        <td>{coin.price_change_percentage_1h_in_currency.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BottomCoinTable