# Spotify_MERN

Using Spotify's API and Songkick's API, this web-app attempts to keep you updated when your favorite artists are playing near you.

This work-in-progress web App is built using React, Node JS and Express for the back-end and data collection and storage is done using MongoDB.

### How to run it ? 

```
git clone https://github.com/barthelemyleveque/Spotify_MERN.git
cd Spotify_MERN
node server.js
```

You have started the server-side, now go to another terminal window and run in the Spotify_MERN folder :

```
cd client && npm start
```

Then open your favorite browser and go to localhost:3000/

[Landing](https://i.ibb.co/0BF5WrY/Screen-Shot-2019-10-28-at-10-31-45-AM.png)

## The Spotify API

First, you have to authentificate through Spotify's API, from which I will get a token allowing me to access your songs history.

[Spotify API](https://i.ibb.co/441hS94/Screen-Shot-2019-10-28-at-10-32-01-AM.png)

## Fetching the user Top 50 Artists

[User Page](https://i.ibb.co/f4Gf7xJ/Screen-Shot-2019-10-28-at-10-32-20-AM.png)

Now I have to reconcile the user's location, and its favorite artists venues.

This will be done using Songkick's API.

The main hurdle I am now facing, is asynchronocity between my twp API calls. Work in Progress.
