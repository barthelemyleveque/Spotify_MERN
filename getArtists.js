const fetch = require('node-fetch');

const getArtists = accessToken => {
    const url = 'https://api.spotify.com/v1/me/top/artists?limit=50';

    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
    })
    .then(res => res.json())
    .then(data => data.items)
    .catch(error => console.log(error));
};

module.exports = getArtists;