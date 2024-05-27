import React from 'react'
import TradingViewWidget from './TradingViewWidget'
import TopCoinsTable from './CoinsTable/TopCoinsTable'
import { useLocation } from 'react-router-dom'


function CoinOverview() {
    const location = useLocation();
    const coin = location.state?.coin;
    if (!coin) {
        return <div>Coin data not found</div>
    }
    return (
        <>
            <div className='co-wrapper'>
                <div className='co-header'>
                    <h2> {coin.name} Statistics</h2>
                    <h3>Price: {coin.current_price}</h3>

                </div>
                <div className='co-body'>
                    <div className='co-chart'>
                        {/* <TradingViewWidget symbol={coin.symbol} /> */}

                    </div>
                    <div className='co-card'>
                        <div>{coin.market_cap}</div>
                        <div>{coin.fully_diluted_valuation}</div>
                        <div>{coin.total_volume}</div>
                        <div>{coin.high_24h}</div>
                        <div>{coin.low_24h}</div>
                        <div>{coin.price_change_24h}</div>
                        <div>{coin.market_cap_change_24h}</div>
                        <div>{coin.market_cap_percentage_24h}</div>






                    </div>
                </div>
            </div>
            <TopCoinsTable />
        </>
    )
}

export default CoinOverview