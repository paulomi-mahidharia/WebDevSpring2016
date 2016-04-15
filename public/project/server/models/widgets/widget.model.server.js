/**
 * Created by paulomimahidharia on 4/13/16.
 */

module.exports = function(db, mongoose, NoteModel) {

    var Note = NoteModel.getMongooseModel();

    var api = {
        createWidget: createWidget,
        findNoteById: findNoteById,
        updateWidget: updateWidget
        //removeWidget: removeWidget,
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

                return note.save();
            }
        );
    }

};