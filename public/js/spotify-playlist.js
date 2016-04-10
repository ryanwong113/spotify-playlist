angular.module('spotify-playlist', ['ngRoute', 'spotify', 'ui.bootstrap'])

    // Config
    .config(function($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : '../views/partials/login.html'
            })
            .when('/home', {
                templateUrl : '../views/partials/home.html'
            })
            .when('/callback', {
                templateUrl : '../views/partials/callback.html'
            });
    })
    .config(function(SpotifyProvider) {
        SpotifyProvider.setClientId('4858aa0aa01141a795854101a3aab0de');
        SpotifyProvider.setRedirectUri('http://localhost:8080/callback');
    })

    // Main Controller
    .controller('MainController', ['Spotify', '$location', function(Spotify, $location) {
        var self = this;

        self.isLoggedIn = false;

        self.userDetails = {};
        self.userPlaylists = {};

        self.showUserDetails = false;
        self.showUserPlaylists = false;

        self.login = function() {
            Spotify.login().then(function (data) {
                // Get user's details
                Spotify.getCurrentUser().then(function(userDetails) {
                    self.userDetails = userDetails;
                    self.isLoggedIn = true;
                });

                // Get user's playlist
                Spotify.getUserPlaylists(self.userDetails['id']).then(function(userPlaylists) {
                    console.log(userPlaylists);
                    self.userPlaylists = userPlaylists['items'];
                });

                // Redirect to home page
                $location.path('/home');

            }, function (data) {
                console.log('Didn\'t log in');
            })
        };

        self.getUserDetails = function() {
            self.showUserDetails = !self.showUserDetails;
        };

        self.getUserPlaylists = function() {
            self.showUserPlaylists = !self.showUserPlaylists;
        };

        self.tracks = [];
        self.selectedTracks = [];
        self.getTrack = function(trackName) {
            Spotify.search(trackName, 'track').then(function(data) {
                self.tracks.length = 0;

                tracks = data['tracks']['items'];
                for (var i = 0; i < tracks.length; i++) {
                    track = tracks[i];

                    trackId = track['id'];
                    trackName = track['name'];

                    // Artist and album objects
                    artist = track['artists'][0];
                    album = track['album'];

                    // Album details
                    albumId = album['id'];
                    albumName = album['name'];
                    albumImages = album['images']
                    albumImageUrl = albumImages[albumImages.length - 1]['url'] // Get the smallest album image

                    // Artist details
                    artistId = artist['id'];
                    artistName = artist['name'];

                    self.tracks.push({
                        'trackId' : trackId,
                        'trackName' : trackName,
                        'albumId' : albumId,
                        'albumName' : albumName,
                        'albumImageUrl' : albumImageUrl,
                        'artistId' : artistId,
                        'artistName' : artistName
                    });

                }
            });
        };

        self.saveTrack = function(track) {
            if (!self.selectedTracks.includes(track)) {
                self.selectedTracks.push(track);
            }
        };

        self.clearSelectedTracks = function() {
            self.selectedTracks.length = 0;
        };

    }])
