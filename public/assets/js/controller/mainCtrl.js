/**
 * Created by kaizzige on 4/4/15.
 */


(function (App) {
    'use strict';
    var ctrlName = 'MainCtrl';

    function controller($scope, socket) {
        $scope.data = [];

        socket.on('connected', function (res) {
            console.log('socket connected!');
            if (res && res.isUpdate) {
                $scope.data = [];
                socket.emit('get-item', {}, function () {
                });
            }
        });


        socket.on('new-item', function (res) {
            console.log(res.item);
            $scope.data.push(res.item);

        });

        socket.on('disconnect', function () {
            console.log('socket disconnected!');
            socket.reconnect();
        });

        socket.on('show-item', function (res) {
            res.item && $scope.data.push(res.item);
        });
    }

    controller.$inject = ['$scope', 'socket'];

    App.controller(ctrlName, controller);

})(app);
