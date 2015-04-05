/**
 * Created by kaizzige on 4/4/15.
 */


(function (App) {
    'use strict';
    var serviceName = 'socket';
    var url = 'http://' + window.location.hostname + ':8282';

    function service($rootScope) {
        var socket = io.connect(url);
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            },
            once: function (eventName, callback) {
                socket.once(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            reconnect: function () {
                socket = io.connect(url);
            }
        };
    }

    service.$inject = ['$rootScope'];

    App.factory(serviceName, service);

})(app);


