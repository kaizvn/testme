var App = (function (ng) {

    return ng.module('testApp', [])
        .config(function () {
            /* config */
        })
        .constant('_', window._)
        .run(function () {
            /* run */
        });
})(angular);
