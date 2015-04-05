/**
 * Created by kaizzige on 4/6/15.
 */


(function (app) {
    'use strict';
    var directiveName = 'dndData';

    function directive(socket) {

        return function (scope, element, attrs) {

            var dragIndex = -1;

            // jquery-ui sortable
            $(element[0]).sortable({
                items: 'li.item',
                start: function (event, ui) {
                    dragIndex = ($(ui.item).index());
                },
                stop: function (event, ui) {
                    var dropIndex = ($(ui.item).index());
                    // return if not move
                    if (dragIndex === dropIndex) return false;

                    // update data in main scope
                    var update = scope.updateData(dragIndex, dropIndex);
                    // emit event
                    update && socket.emit('dnd-item', {dragIndex: dragIndex, dropIndex: dropIndex});
                },
                axis: 'xy'
            })
        }
    }

    directive.$inject = ['socket'];

    app.directive(directiveName, directive);

})(App);

