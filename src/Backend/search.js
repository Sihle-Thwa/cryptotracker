import axios from 'axios';
import { useState, useEffect } from 'react';

export const Search = {
    async fetchCryptoData(searchTerm) {
        try {
            const response = await axios.get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&ids=${searchTerm.toLowerCase().replace(' ', '-')}&per_page=1`,
                {
                    headers: {
                        accept: 'application/json',
                        'x-cg-demo-api-key': 'CG-dM17N6ui7skmJrhbqmjuQRMt',
                    },
                }
            );

            const data = response.data;
            if (data.length > 0) {
                return data[0];
            } else {
                throw new Error(`No crypto data found for search term "${searchTerm}"`);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export const useSearch = (searchedItem) => {
    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await Search.fetchCryptoData(searchedItem);
                setCryptoData(data);
                setError(null);
            } catch (error) {
                setError(error.message);
                setCryptoData(null);
            }
        };
        fetchData();
    }, [searchedItem]);

    const filteredCoin = cryptoData ? cryptoData.filter((coin) =>
        coin.name.toLowerCase().includes(searchedItem.toLowerCase())
    ) : [];

    return { cryptoData, error, filteredCoin };
};