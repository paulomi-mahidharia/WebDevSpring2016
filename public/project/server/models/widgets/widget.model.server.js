/**
 * Created by paulomimahidharia on 4/13/16.
 */

module.exports = function(db, mongoose, NoteModel) {

    var Note = NoteModel.getMongooseModel();

    var api = {
        createWidget: createWidget
        //updateWidget: updateWidget,
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
};