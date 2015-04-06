/**
 * Created by kaizzige on 4/4/15.
 */

'use strict';
var Model = require('../models/RepositoryModel');
var model = new Model();
var count = 0;

exports.connect = function (socket) {
    count++;
    console.log('an user has connected');
    console.log('connected: %s', count);

    socket.emit('connected', {
        isUpdate: (model.getItemList().length > 0)
    });

    socket.on('get-item', function () {
        var data = model.getItemList();
        //[].forEach.call(data, function (item) {
            model.emitItem('send-items', socket, data);
        //});
    });

    socket.on('disconnect', function () {
        count--;
        console.log('an user has disconnected');
        console.log('connected: %s', count);
    });

    socket.on('dnd-item', function (req) {
        var updateRepo = model.updateDragItem(req.dragIndex, req.dropIndex);
        updateRepo && socket.broadcast.emit('dnd-drag-pos', req);
    });

};


exports.newItem = function (socket) {
    return function (req, res) {
        var item = req.body;
        if (!item.name || item.name === '') return;

        var isAdded = model.setItem(item);
        if (isAdded) {
            model.emitItem('add-new', socket, item);
            res.json({status: 'ok'});
        } else {
            res.json({status: 'not OK'});
        }

    }


};


exports.getItem = function (req, res) {
    var data = model.getItemList();
    var result = {};
    if (!req.params.id) {
        result = data;
    } else {
        result = [].filter.call(data, function (item) {
            return item.id == req.params.id;
        });
    }

    result && res.json(result);
    res.end();
};

