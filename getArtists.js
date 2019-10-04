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
/*
fetch('https://api.songkick.com/api/3.0/search/artists.json?apikey=n6cSsSbFXJEMvfAd&query='+e.name)
          .then((res) => {
            if (res.ok) {
              data_artist => artist_id = data_artist.resultsPage.results.artist[0].id
              return res.json();
            }
            else {
              console.log('somethign went wrong');
            }
*/
module.exports = getArtists;