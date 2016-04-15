/**
 * Created by paulomimahidharia on 4/13/16.
 */

module.exports = function(db, mongoose, NoteModel) {

    var Note = NoteModel.getMongooseModel();

    var api = {
        createWidget: createWidget,
        findNoteById: findNoteById,
        getWidgetById: getWidgetById
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

    function getWidgetById(noteId, widgetId){

        return Note
            .findById(noteId);

        //console.log(note);
        //
        //if(note){
        //    for(var i in note.widgets){
        //        if(note.widgets[i]._id == widgetId){
        //            return note.widgets[i];
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //}
        //else{
        //    return null;
        //}





        //return Note.findOne({_id:noteId, 'widgets':{$in: [widgetId]}})
    }
};