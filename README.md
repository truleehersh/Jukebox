# Jukebox

A web app for visualizing your Spotify data. 

View your top artists and tracks, recently played tracks, playlists, and more.

Created with many tools, including:
- [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Angular](https://angularjs.org/)

## Setup

1. [Register a Spotify App](https://developer.spotify.com/dashboard/applications) and add http://localhost:5000/callback as a Redirect URI in the app settings
2. Create an `.env` file in the root of the project
    - Add values for `REDIRECT_URI`, `CLIENT_ID`, `CLIENT_SECRET` (get these from the Spotify Dashboard)
3. `npm install`
4. `npm start`
