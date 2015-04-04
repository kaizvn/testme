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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

http.listen(8282);
io.on('connection', repository.response);

app.route('/items')
    .get(repository.getItems)
    .post(repository.newItem(io));

app.use(express.static('public'));


var server = app.listen('8080', '0.0.0.0', function () {
    var sv = server.address();
    console.log('server connected at %s:%s', sv.address, sv.port);
});
