/**
 * Created by kaizzige on 4/4/15.
 */

'use strict';

var dataObj = require('../../assets/data/tempData.json');

function Repository() {
    // get top 100
    this.items = dataObj.data.items.slice(0, 100);
}

Repository.prototype.getItemList = function () {
    return this.items;
};

Repository.prototype.getItem = function (id) {
    return [].forEach.call(this.items, function (item) {
        return item.id = id;
    })
};

Repository.prototype.setItem = function (item) {
    try {
        this.items.push(item);
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
};

Repository.prototype.emitItem = function (type, socket, item) {
    switch (type) {
        case 'add-new':
            socket.sockets.emit('new-item', {type: type, item: item});
            break;

        case 'init':
            socket.emit('show-item', {type: type, item: item});
            break;

        default :
            break;
    }
    return false;
};


module.exports = Repository;
