/**
 * Created by kaizzige on 4/4/15.
 */

'use strict';
var repository = require('../controllers/repositoryCtrl');

module.exports = function (app, io) {

    app.route('/items')
        .get(repository.getItems)
        .post(repository.newItem(io));
};
