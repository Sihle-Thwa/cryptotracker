import { useEffect, useState } from "react"
import { fetchTopCoins } from "../../Backend/api"
import './table.css'


function TopCoinsTable() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const topCoins = async () => {
            const data = await fetchTopCoins();

            setCoins(data);
        };
        topCoins();
    }, []);

    return (
        <table className="styled-table">
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
                        <td>R {coin.current_price.toFixed(2)}</td>
                        <td>{coin.price_change_percentage_1h_in_currency.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TopCoinsTable