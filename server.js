/**
 * Created by kaizzige on 4/3/15.
 */

'use strict';

var express = require('express')
    , app = express()
    , http = require('http').Server(app)
    , bodyParser = require('body-parser')
    , io = require('socket.io')(http)
    , repository = require('./app/modules/controllers/RepositoryCtrl');

http.listen(8282, '0.0.0.0', function () {
    var sv = http.address();
    console.log('socket started at %s:%s', sv.address, sv.port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


io.on('connection', repository.connect);


app.route('/items')
    .get(repository.getItem)
    .post(repository.newItem(io));

app.route('/items/:id')
    .get(repository.getItem)

app.use(express.static('public'));


var server = app.listen('8888', '0.0.0.0', function () {
    var sv = server.address();
    console.log('server started at %s:%s', sv.address, sv.port);
});
