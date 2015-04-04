/**
 * Created by kaizzige on 4/3/15.
 */

'use strict';

var express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , io = require('socket.io')(8282)
    , repository = require('./app/modules/controllers/RepositoryCtrl');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


io.on('connection', repository.connect);


app.route('/items')
    .get(repository.getItems)
    .post(repository.newItem(io));

app.use(express.static('public'));


var server = app.listen('8080', '0.0.0.0', function () {
    var sv = server.address();
    console.log('server connected at %s:%s', sv.address, sv.port);
});
