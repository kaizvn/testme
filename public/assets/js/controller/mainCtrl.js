/**
 * Created by kaizzige on 4/4/15.
 */


(function (app) {
    'use strict';
    var ctrlName = 'MainCtrl';

    function controller($scope, socket, $http) {
        $scope.data = [];
        $scope.connections = -1;

        socket.on('connected', function (res) {
            console.log('socket connected!');
            if (res && res.isUpdate) {
                $scope.data = [];
                $scope.connections = res.connections;
                socket.emit('get-item', {});
            }
        });

        socket.on('update-count', function (res) {
            $scope.connections = res.connections;
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
            $scope.data = (res.item && res.item.length) ? res.item : $scope.data;
        });


        socket.on('dnd-drag-pos', function (res) {
            $scope.updateData(res.dragIndex, res.dropIndex);
        });

        $scope.updateData = function (dragIndex, dropIndex) {
            var moveIndex = $scope.data.splice(dragIndex, 1)[0];
            !!(moveIndex) && $scope.data.splice(dropIndex, 0, moveIndex);

            return !!(moveIndex);
        }

        //

        $scope.addItem = function () {
            console.log('name %s', $scope.textContent);
            $http.post('/items',
                {name: $scope.textContent})
                .success(function (res) {
                    if (res.status === 'ok') {
                        $scope.textContent = '';
                    }
                })
                .error(function (err) {
                    console.error(err);
                })

        };

        $scope.$watch("data", function () {
        }, true);
    }

    controller.$inject = ['$scope', 'socket', '$http'];

    app.controller(ctrlName, controller);

})(App);
