require('dotenv').config({path: 'variables.env'});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Datastore = require('nedb');
const cron = require('node-cron');
const Pusher = require('pusher');
const fetch = require('node-fetch');

const authorizeSpotify = require('./authorizeSpotify');
const getAccessToken = require('./getAccessToken');
const getArtists = require('./getArtists');
const Songkick = require('./songkick');

const clientUrl = process.env.CLIENT_URL;

const app = express();

const db = new Datastore();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/login', authorizeSpotify);
app.get('/callback', getAccessToken, (req, res, next) =>{
  db.insert(req.credentials, err => {
    if (err) {
      next(err);
    } else {
      console.log({clientUrl});
      res.redirect(`${clientUrl}/?authorized=true`);
    }
  });
});

function test(name){
  return name;
}
app.get('/history', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      throw Error('Failed to retrieve documents');
    }

    const accessToken = docs[0].access_token;
    getArtists(accessToken)
      .then(data => {
        const arr = data.map(e => ({
          artist_name: e.name,
          artist_picture: e.images[0].url,
          artist_id: 0
        }));
        res.json(arr);
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    });
  });

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});