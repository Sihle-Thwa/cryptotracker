import React from 'react'
import TradingViewWidget from './TradingViewWidget'
import TopCoinsTable from './CoinsTable/TopCoinsTable'



function CoinOverview({ coin }) {
    return (
        <>
            <div className='co-wrapper'>
                <div className='co-header'>
                    <h1>Bitcoin</h1>
                    <h3>Price</h3>
                    <h5>+20%</h5>
                </div>
                <div className='co-body'>
                    <div className='co-chart'>

                    </div>
                    <div className='co-card'>

                    </div>
                </div>
            </div>
            <TopCoinsTable />
        </>
    )
}

export default CoinOverview