/**
 * Created by kaizzige on 4/4/15.
 */

'use strict';
var Model = require('../models/RepositoryModel');
var model = new Model();
var count = 0;

exports.response = function (socket) {
    count++;
    console.log('connected: %s', count);

    socket.on('get-item', function () {
        var data = model.getItemList();
        [].forEach.call(data, function (item) {
            model.emitItem('init', socket, item);
        });
    });

    var isUpdate = (model.getItemList().length > 0);
    socket.emit('repo-info', {isUpdate: isUpdate});

};

exports.getItems = function (req, res, next) {
    var item = model.getItemList();
    item && res.json(item);
    res.end();
}


exports.newItem = function (socket) {
    return function (req, res) {
        console.log(req.body);
        var item = req.body;

        var isAdded = model.setItem(item);
        if (isAdded) {
            model.emitItem('add-new', socket, item);
            res.json({status: 'ok'});
        } else {
            res.json({status: 'not OK'});
        }

    }


}

