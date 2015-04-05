/**
 * Created by kaizzige on 4/4/15.
 */

'use strict';

var dataObj = require('../../assets/data/tempData.json');
var MAX_ITEM = 50;

function Repository() {
    // get top items into repository
    this.items = dataObj.data.items.slice(0, MAX_ITEM);
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

/* Update the data in repository */
Repository.prototype.updateDragItem = function (dragIndex, dropIndex) {
    var toMove = this.items.splice(dragIndex, 1)[0];
    if (toMove === undefined) return false;

    this.items.splice(dropIndex, 0, toMove);
    return true;


};

Repository.prototype.emitItem = function (type, socket, item) {
    switch (type) {
        case 'add-new':
            socket.sockets.emit('new-item', {type: type, item: item});
            break;

        case 'send-items':
            socket.emit('show-item', {type: type, item: item});
            break;

        default :
            break;
    }
    return false;
};


module.exports = Repository;
