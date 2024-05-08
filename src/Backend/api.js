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