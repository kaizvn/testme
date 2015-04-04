/**
 * Created by kaizzige on 3/25/15.
 */
(function() {
    'use strict';
    angular.module('Ekinoffy.service')
        .factory('CallAPIService', ['$q', '$http', 'HostConfig', function($q, $http, HostConfig) {
            var instaCartAPI = {};

            instaCartAPI.get = function(path) {
                var _deferred = $q.defer();
                $http.get(HostConfig.API_URL + '/' + path)
                    .success(function(data, status, headers, config) {
                        _deferred.resolve(data);
                    })
                    .error(function(data, status, headers, config) {
                        _deferred.reject('error');
                    });

                return _deferred.promise;
            };

            return instaCartAPI;
        }]);
})();
