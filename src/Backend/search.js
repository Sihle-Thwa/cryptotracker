const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function search() {
    const id = searchInput.value;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-dM17N6ui7skmJrhbqmjuQRMt',
        },
    };

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&ids=${id}`, options);
        const data = await response.json();

        if (data.length > 0) {
            // Redirect to the page for the specified ID
            window.location.href = `/id/${id}`;
        } else {
            alert('No results found for the specified ID.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while searching for the specified ID.');
    }
}

searchButton.addEventListener('click', search);