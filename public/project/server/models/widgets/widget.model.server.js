/**
 * Created by paulomimahidharia on 4/13/16.
 */

module.exports = function(db, mongoose, NoteModel) {

    var Note = NoteModel.getMongooseModel();

    var api = {
        createWidget: createWidget,
        findNoteById: findNoteById,
        updateWidget: updateWidget,
        removeWidget: removeWidget
        //sortWidget  : sortWidget
    };
    return api;


    function createWidget(noteId, widget) {

        return Note.findById(noteId)
            .then(
                function(note) {

                    note.widgets.push(widget);

                    return note.save();
                }
            );
    }
    function findNoteById(noteId){

        return Note.findById(noteId);
    }

    function updateWidget(noteId, widgetId, newWidget){

        delete newWidget._id;

        return Note
            .findById(noteId)
            .then(function (note){

                var widget = note.widgets.id(widgetId);

                if(widget.widgetType === "TEXT") {
                    if (newWidget.html) {
                        widget.html = {
                            text: newWidget.html.text
                        };
                    }
                }

                if(widget.widgetType === "MAP"){
                    if(newWidget.map){
                        widget.map = {
                            lat : newWidget.map.lat,
                            lng : newWidget.map.lng,
                            location : newWidget.map.location,
                            placeId : newWidget.map.placeId
                        }
                    }
                }

                if(widget.widgetType === "UPLOAD"){
                    if(newWidget.upload){
                        widget.upload = {
                            url : newWidget.upload.url,
                            name : newWidget.upload.name
                        }
                    }
                }

                return note.save();
            }
        );
    }

    function removeWidget(noteId, widgetId) {

        return Note
            .findById(noteId)
            .then(
                function(note) {

                    note.widgets.remove(widgetId);
                    return note.save();
                }
            );
    }


};