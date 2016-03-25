var express = require('express'),
app = express();

app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendfile('SpotifyPlaylist.html', {root: __dirname })
});
var server = app.listen(process.env.PORT || 80);
