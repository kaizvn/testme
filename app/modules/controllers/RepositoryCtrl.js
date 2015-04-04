/**
 * Created by kaizzige on 4/4/15.
 */

'use strict';
var Model = require('../models/RepositoryModel');
var model = new Model();
var count = 0;

exports.connect = function (socket) {
    count++;
    console.log('connected: %s', count);

    socket.emit('connected', {
        isUpdate: (model.getItemList().length > 0)
    });

    socket.on('get-item', function () {
        var data = model.getItemList();
        [].forEach.call(data, function (item) {
            model.emitItem('send-items', socket, item);
        });
    });

    socket.on('disconnect', function () {
        count--;
        console.log('one user has disconnected');
        console.log('connected: %s', count);
    });

};


exports.newItem = function (socket) {
    return function (req, res) {
        var item = req.body;

        var isAdded = model.setItem(item);
        if (isAdded) {
            model.emitItem('add-new', socket, item);
            res.json({status: 'ok'});
        } else {
            res.json({status: 'not OK'});
        }

    }


};


exports.getItems = function (req, res) {
    var item = model.getItemList();
    item && res.json(item);
    res.end();
};

