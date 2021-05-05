//frontend development goes here
var app = angular.module('app', []);
$("#login").show();
$("#loggedin").hide();
$("#logout").hide();

//for Spotify login
var params = getHashParams();
var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

function convertTime(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

//initialize the page
if (access_token) {
    $("#login").hide();
    $("#loggedin").show();
    $("#artists").hide();
    $("#tracks").hide();
    $("#recent").hide();
    $("#playlists").hide();
    $('#profileNav').css('color', 'white');
}

app.controller('sidenav', function($scope,$http) {

    $scope.navChanged = function(string) {
        var IDs = ["profile", "artists", "tracks", "recent", "playlists"];
        $('#' + string).show();
        $('#' + string + 'Nav').css('color', 'white');
        for(var i=0; i<IDs.length; i++){
            if(string != IDs[i]){
                $("#"+IDs[i]).hide();
                $('#'+IDs[i]+'Nav').css('color', 'rgb(173, 173, 173)');
            }
        }
      };
});

// User Info
app.controller('user',function ($scope,$http) {

    var req = {
        method: 'POST',
        url: '/user',
        data: {test_access: access_token}
    };

    $http(req)
        //successful callback
        .then(function(data){
        data = data["data"];
        $scope.displayName=data["display_name"];
        $scope.imageUrl=data["images"][0]["url"];
        $scope.spotifyLink=data["external_urls"]["spotify"];
        cur_user=data["display_name"];
    },
    //fail callback
    function(data){
        console.log("fail to get user profile information");
    });
});

// Top Artists Preview
app.controller('artistsPrev', function($scope, $http) {
    var req = {
        method: 'POST',
        url: '/artists',
        data: {test_access: access_token, limit: 10}
    };

    $http(req)
        //successful callback
        .then(function(data){
        $scope.artists = data["data"]["items"];
    },
    //fail callback
    function(data){
        console.log("fail to get user profile information");
    });
});

// Top Tracks Preview
app.controller('tracksPrev', function($scope, $http) {
    var req = {
        method: 'POST',
        url: '/tracks',
        data: {test_access: access_token, limit: 10}
    };

    $http(req)
        //successful callback
        .then(function(data){
            console.log(data);
        $scope.tracks = data["data"]["items"];
    },
    //fail callback
    function(data){
        console.log("fail to get user profile information");
    });

    $scope.millisToMinutesAndSeconds = function(millis) { return convertTime(millis);}
});


// Top Artists Page
app.controller('artists', function($scope, $http) {
    var req = {
        method: 'POST',
        url: '/artists',
        data: {test_access: access_token, limit: 50}
    };

    $http(req)
        //successful callback
        .then(function(data){
        $scope.artists = data["data"]["items"];
    },
    //fail callback
    function(data){
        console.log("fail to get user profile information");
    });
});

// Top Tracks Page
app.controller('tracks', function($scope, $http) {
    var req = {
        method: 'POST',
        url: '/tracks',
        data: {test_access: access_token, limit: 50}
    };

    $http(req)
        //successful callback
        .then(function(data){
        $scope.tracks = data["data"]["items"];
    },
    //fail callback
    function(data){
        console.log("fail to get user profile information");
    });

    $scope.millisToMinutesAndSeconds = function(millis) {return convertTime(millis);}
});

// Recently Played Tracks Page
app.controller('recent', function($scope, $http) {
    var req = {
        method: 'POST',
        url: '/recent',
        data: {test_access: access_token, limit: 50}
    };

    $http(req)
        //successful callback
        .then(function(data){
        $scope.songs = data["data"]["items"];
    },
    //fail callback
    function(data){
        console.log("fail to get user profile information");
    });

    $scope.millisToMinutesAndSeconds = function(millis) {return convertTime(millis);}
});

// Playlists Page
app.controller('playlists', function($scope, $http) {
    var req = {
        method: 'POST',
        url: '/playlists',
        data: {test_access: access_token}
    };

    $http(req)
        //successful callback
        .then(function(data){
        $scope.playlists = data["data"]["items"];
    },
    //fail callback
    function(data){
        console.log("fail to get user profile information");
    });
});





