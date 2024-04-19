import axios from "axios";
import { useEffect } from "react";

const URL = "https://api.coingecko.com/api/v3"

export const fetchAllCoins = async () => {

    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar', {
            headers: {
                Accept: 'application/json',
                'x-cg-demo-api-key': "CG-dM17N6ui7skmJrhbqmjuQRMt",
            },
        });
        if (response.status !== 200) {
            throw new Error('Error fetching coin market data');
        }
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
