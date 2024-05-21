import axios from "axios";


export const fetchAllCoins = async () => {
    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: { vs_currency: 'zar' },
            headers: {
                accept: 'application/json',
                'x-cg-demo-api-key': 'CG-dM17N6ui7skmJrhbqmjuQRMt'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return []; // return an empty array in case of an error
    }
};

export const fetchTopCoins = async () => {
    try {
        const response = await axios.request({
            method: "GET",
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: {
                vs_currency: 'zar',
                order: "market_cap_desc",
                per_page: 10,
                price_change_percentage: "1h"
            },
            headers: {
                accept: "application/json",
                'x-cg-demo-api-key': 'CG-dM17N6ui7skmJrhbqmjuQRMt'

            }
        });
        const sortedData = response.data.sort((a, b) => b.price_change_percentage_1h_in_currency - a.price_change_percentage_1h_in_currency);

        return sortedData;
    } catch (error) {
        console.error(error);
        return [];

    }
}

export const fetchBottomCoins = async () => {
    try {
        const response = await axios.request({
            method: "GET",
            url: 'https://api.coingecko.com/api/v3/coins/markets',
            params: {
                vs_currency: 'zar',
                order: "market_cap_desc",
                per_page: 10,
                price_change_percentage: "1h"
            },
            headers: {
                accept: "application/json",
                'x-cg-demo-api-key': 'CG-dM17N6ui7skmJrhbqmjuQRMt'

            }
        });
        const sortedData = response.data.sort((a, b) => a.price_change_percentage_1h_in_currency - b.price_change_percentage_1h_in_currency);

        return sortedData;
    } catch (error) {
        console.error(error);
        return [];

    }
}
