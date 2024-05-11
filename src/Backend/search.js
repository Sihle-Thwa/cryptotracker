import axios from 'axios';
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

export const Search = {
    cryptoData: null,
    error: null,

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
                this.cryptoData = data[0];
                this.error = null;
            } else {
                this.cryptoData = null;
                this.error = `No crypto data found for search term "${searchTerm}"`;
            }
        } catch (error) {
            this.error = error.message;
            this.cryptoData = null;
        }
    },
};

const debounceFetchCryptoData = debounce(Search.fetchCryptoData, 500);

export const useSearch = (searchedItem) => {
    useEffect(() => {
        if (searchedItem) {
            const searchTermID = searchedItem.toLowerCase().replace(' ', '-');
            debounceFetchCryptoData(searchTermID);
        }
    }, [searchedItem]);
};