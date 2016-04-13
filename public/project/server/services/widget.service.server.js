/**
 * Created by paulomimahidharia on 4/13/16.
 */
module.exports = function (app, NoteModel) {

    //var applicationModel = model.applicationModel;

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/project/note/:noteId/widget", createWidget);

    function createWidget(req, res) {
        var noteId = req.params.noteId;

        var widget = req.body;

        //var widget = req.body;

        NoteModel
            .createWidget(noteId, widget)
            .then(
                function(note) {
                    var widgets = note.widgets;
                    res.json(widgets[widgets.length - 1]);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

};