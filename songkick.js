
const fetch = require('node-fetch');

function Songkick(artist) {
        key = "n6cSsSbFXJEMvfAd";
        url = 'https://api.songkick.com/api/3.0/search/artists.json?apikey='+key+'&query='+artist;
        console.log(url);
        res = fetch(url)
            .then(res => res.json())
            .then((out) => {
                console.log('checkout the json :', out);
            })
            .catch(err => {throw err});
}
module.exports = Songkick;