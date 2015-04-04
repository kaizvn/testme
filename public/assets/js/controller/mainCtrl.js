/**
 * Created by kaizzige on 4/4/15.
 */


(function (App) {
    'use strict';
    var ctrlName = 'MainCtrl';

    function controller($scope, socket) {
        $scope.data = [];

        socket.on('new-item', function (res) {
            console.log(res.item);
            $scope.data.push(res.item);

        });

        socket.on('repo-info', function (res) {
            if (res && res.isUpdate) {
                socket.emit('get-item', {}, function () {
                    console.log('oh ho');
                });
            }
        });

        socket.on('show-item', function (res) {
            res.item && $scope.data.push(res.item);
        });
    }

    controller.$inject = ['$scope', 'socket'];

    App.controller(ctrlName, controller);

})(app);
