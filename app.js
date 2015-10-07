var express = require('express'),
    bodyParser = require('body-parser');

var handler = require('./handler'),
    method = require('./method');

var app = express(),
    port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(method.catchJsonErrors);

app.listen(port);
module.exports = app;

console.log('Node app is running on port', app.get('port'));

app.route('/')
    .get(handler.showIndex)
    .post(handler.filterShows);