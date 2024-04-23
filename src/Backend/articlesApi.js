import axios from "axios";

const URL = "https://newsapi.org/v2";

export const fetchBitcoinNews = async () => {
    try {
        const response = await axios.get(`${URL}/everything`, {
            params: {
                q: "crypto",
                apiKey: "22d76ecaf13a472aa64b6a5fc344f398",
            },
            headers: {
                Accept: "application/json",
            },
        });
        if (response.status !== 200) {
            throw new Error("Error fetching news articles");
        }
        return response.data.articles;
    } catch (error) {
        console.error(error);
        throw error;
    }
};