/**
 * Created by paulomimahidharia on 4/8/16.
 */
/**
 * Created by paulomimahidharia on 3/25/16.
 */
(function() {
    angular
        .module("NoteSpace")
        .controller("EditNoteController", EditNoteController);

    function EditNoteController(NoteService, $routeParams, $location, $sce, WidgetService, $rootScope) {

        var vm = this;

        vm.trustAsHtml = trustAsHtml;
        vm.editWidget = editWidget;
        vm.deleteWidget = deleteWidget;
        vm.getSrc = getSrc;
        vm.saveNote = saveNote;
        vm.sortWidgets = sortWidgets;
        vm.safeYouTubeUrl = safeYouTubeUrl;

        var noteId;

        var userId = $rootScope.currentUser._id;

        function init() {

            noteId = $routeParams.noteId;
            vm.noteId = noteId;

            NoteService.findNoteById(noteId)
                .then(
                    function(response){

                        vm.widget = response.data;
                    }
                );

            WidgetService.getWidgets(noteId)
                .then(
                    function(response){

                        vm.widgets = response.data;

                    }
                );

            NoteService
                .findAllNoteBooksForUser(userId)
                .then(
                    function (response){

                        vm.notebooks = response.data;
                    }
                )

        }
        init();



        function trustAsHtml(html) {

            return $sce.trustAsHtml(html);
        }

        function editWidget(widget){

            if(widget.widgetType == "TEXT"){

                $location.url("/note/"+noteId+"/text/"+widget._id);
            }

            if(widget.widgetType == "MAP"){

                $location.url("/note/"+noteId+"/map/"+widget._id);
            }
            if(widget.widgetType == "UPLOAD"){

                $location.url("/note/"+noteId+"/fileupload/"+widget._id);
            }

            if(widget.widgetType == "IMAGE"){

                $location.url("/note/"+noteId+"/image/"+widget._id);
            }

            if(widget.widgetType == "YOUTUBE"){

                $location.url("/note/"+noteId+"/youtube/"+widget._id);
            }
            if(widget.widgetType == "TODO"){

                $location.url("/note/"+noteId+"/todo/"+widget._id);
            }
        }

        function deleteWidget(widget){

            var widgetIndex = vm.widgets.indexOf(widget);

            WidgetService
                .removeWidget(noteId, widget._id)
                .then(

                    function(response) {

                        vm.widgets.splice(widgetIndex, 1);
                    },

                    function(error) {

                        vm.error = error;
                    }
                );

        }

        function getSrc(src){

            return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/place?"
            +"key=AIzaSyCf4_tYh0DMPul0ewcyzdK9l5K_jNHDU9Y&q="+src);
        }

        function saveNote(note){

            var recentNote;

            NoteService
                .findNoteById(noteId)
                .then(
                    function(response){
                        recentNote = response.data;
                    }

                );

            note.updatedDate = new Date();



            NoteService
                .updateNoteById(noteId, recentNote)
                .then(
                    function (response) {
                        $location.url("/note");
                    }
                )
        }

        function sortWidgets(start, end) {
            NoteService
                .sortWidgets(noteId, start, end)
                .then(
                    function (response) {
                    },
                    function (err) {
                        vm.error = err;
                    }
                );
        }

        function safeYouTubeUrl(widget) {

            if(widget && widget.youtube) {

                var urlParts = widget.youtube.url.split("/");
                var youTubeId = urlParts[urlParts.length-1];

                return $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+youTubeId);
            }
            return "";
        }

    }
})();