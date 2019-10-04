
const fetch = require('node-fetch');

async function Songkick(artist){
    const key = "n6cSsSbFXJEMvfAd";
    const url = 'https://api.songkick.com/api/3.0/search/artists.json?apikey='+key+'&query='+artist; 

    let response = await fetch(url);
    let data_artist = await response.json();
    
    return data_artist;
};


module.exports = Songkick;