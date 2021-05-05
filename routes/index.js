//required utilities for this project
var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var request = require('request'); // "Request" library
require('dotenv').config();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/callback';;
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  redirect_uri = 'http://localhost:3000/callback';
}


// Point to HTML file
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Log in' });
});

// LOGIN FUNCTIONALITY ---------------------------------------------------
// var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
var stateKey = 'spotify_auth_state';

router.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-library-read playlist-read-collaborative playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        show_dialog: true,
        state: state
      }));
  console.log(res);
});

router.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state === null || state !== storedState) {
    res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
            refresh_token = body.refresh_token;
        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));
      } else {
        res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
      }
    });
  }
});

var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// ------------------------------------------------------------------------------------------------------

router.post('/user',function(req,res){
  var access_token = req.body.test_access;
  var url = 'https://api.spotify.com/v1/me';
 
  //Spotify API for user info
  request(url, { json: true, headers: {'Authorization': 'Bearer ' + access_token} }, (err, response, body) => {
    if(err) { 
      return console.log(err)
    } else {
      res.send(body);
    }

  });
});

router.post('/artists',function(req,res){
  var access_token = req.body.test_access;
  var limit = req.body.limit;
  var url = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit='+limit+'&offset=0';
 
  //Spotify API for user info
  request(url, { json: true, headers: {'Authorization': 'Bearer ' + access_token} }, (err, response, body) => {
    if(err) { 
      return console.log(err)
    } else {
      res.send(body);
    }

  });
});

router.post('/tracks',function(req,res){
  var access_token = req.body.test_access;
  var limit = req.body.limit;
  var url = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit='+limit+'&offset=0';
 
  //Spotify API for user info
  request(url, { json: true, headers: {'Authorization': 'Bearer ' + access_token} }, (err, response, body) => {
    if(err) { 
      return console.log(err)
    } else {
      res.send(body);
    }

  });
});

router.post('/recent',function(req,res){
  var access_token = req.body.test_access;
  var url = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';
 
  //Spotify API for user info
  request(url, { json: true, headers: {'Authorization': 'Bearer ' + access_token} }, (err, response, body) => {
    if(err) { 
      return console.log(err)
    } else {
      res.send(body);
    }

  });
});

router.post('/playlists',function(req,res){
  var access_token = req.body.test_access;
  var limit = req.body.limit;
  var url = 'https://api.spotify.com/v1/me/playlists?limit=50&offset=0';
 
  //Spotify API for user info
  request(url, { json: true, headers: {'Authorization': 'Bearer ' + access_token} }, (err, response, body) => {
    if(err) { 
      return console.log(err)
    } else {
      res.send(body);
    }

  });
});



module.exports = router;