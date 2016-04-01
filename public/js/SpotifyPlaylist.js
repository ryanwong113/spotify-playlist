angular.module('SpotifyPlaylist', ['spotify'])

  // Main Controller
  .controller('PlaylistController', ['Spotify', function(Spotify) {
    var self = this;

    self.login = function() {
      Spotify.login();
    };


  }])

  // Track Controller
  .controller('TrackController', ['Spotify', function(Spotify) {
    var self = this;

    self.tracks = [];
    self.selectedTrackIds = [];

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
          albumImages = album['images'];
          albumImageUrl = albumImages[albumImages.length - 1]['url']; // Get the smallest album image

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

    self.saveTrack = function(trackId) {
      self.selectedTrackIds.push(trackId);
    }

    self.clearSelectedTracks = function() {
      self.selectedTracks.length = 0;
    }

  }])

  // Artist Controller
  .controller('ArtistController', ['Spotify', function(Spotify) {
    var self = this;

    self.getArtist = function(artistName) {
      Spotify.search(artistName, 'artist').then(function(data) {
        console.log(data);
      });
    };

  }])

  // Album Controller
  .controller('AlbumController', ['Spotify', function(Spotify) {
    var self = this;

    self.albums = [];

    self.getAlbum = function(albumName) {
      Spotify.search(albumName, 'album').then(function(data) {
        albums = data['albums']['items'];
        for (var i = 0; i < albums.length; i++) {
          album = albums[i];

          albumId = album['id'];
          albumName = album['name'];

          // Get the smallest album image
          albumImages = album['images'];
          albumImageUrl = albumImages[albumImages.length - 1]['url'];

          self.albums.push({
            'albumId' : albumId,
            'albumName' : albumName,
            'albumImageUrl' : albumImageUrl
          });
        }

      });
    };

  }]);
