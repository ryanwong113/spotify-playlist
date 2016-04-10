var http = require('http');
var express = require('express');

var app = express();

app.use(express.static('public'))
    .get('/callback', function(req, res) {
        res.status(200).set({'content-type' : 'text/html; charset=utf-8'})
                       .sendfile('public/views/partials/callback.html');
    })
    .all('/*', function(req, res) {
        res.status(200).set({'content-type' : 'text/html; charset=utf-8'})
                       .sendfile('public/views/index.html');
        })
    .on('error', function(error) {
        console.log('Error: ' + error.message);
        console.log(error.stack);
    });

http.createServer(app)
    .listen(8080)
    .on('error', function(error) {
        console.log('Error: ' + error.message);
        console.log(error.stack);
    });

console.log('Serving app on port 8080');
