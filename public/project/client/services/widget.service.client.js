/**
 * Created by paulomimahidharia on 4/13/16.
 */
(function(){
    angular
        .module("NoteSpace")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            addWidget: addWidget
            //getWidgets: getWidgets,
            //findWidgetById: findWidgetById,
            //updateWidget: updateWidget,
            //removeWidget: removeWidget,
            //sortWidget: sortWidget
        };

        return api;

        function addWidget(noteId, widget) {
            return $http.post("/api/project/note/" + noteId + "/widget", widget);
        }
    }
})();