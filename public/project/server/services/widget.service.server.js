/**
 * Created by paulomimahidharia on 4/13/16.
 */
module.exports = function (app, NoteModel) {

    var fs = require("fs");
    //var applicationModel = model.applicationModel;

    var multer  = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/project/note/:noteId/widget", createWidget);

    app.get("/api/application/note/:noteId/widgets", getWidgets);

    app.get("/api/project/note/:noteId/widget/:widgetId", getWidgetById);

    app.put("/api/project/note/:noteId/widget/:widgetId", updateWidget);

    app.delete("/api/project/note/:noteId/widget/:widgetId", removeWidget);

    app.post ("/api/upload", upload.single('myFile'), uploadFile);

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

    function getWidgets(req, res) {
        var noteId = req.params.noteId;

        NoteModel
            .findNoteById(noteId)
            .then(
                function(note) {
                    res.json(note.widgets);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getWidgetById(req, res){

        var noteId = req.params.noteId;
        var widgetId = req.params.widgetId;

        NoteModel
            .findNoteById(noteId)
            .then(
                function(note) {
                    var widget = note.widgets.id(widgetId);
                    res.json(widget);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateWidget(req, res) {

        var noteId = req.params.noteId;
        var widgetId = req.params.widgetId;
        var widget = req.body;

        NoteModel
            .updateWidget(noteId, widgetId, widget)
            .then(
                function(response) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );


    }

    function removeWidget(req, res) {

        var noteId = req.params.noteId;

        var widgetId = req.params.widgetId;

        NoteModel
            .removeWidget(noteId, widgetId)
            .then(
                function(response) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function uploadFile(req, res) {

        var noteId        = req.body.noteId;

        var widgetId      = req.body.widgetId;

        var myFile        = req.file;

        var destination   = myFile.destination;
        var path          = myFile.path;

        var originalname  = myFile.originalname;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var mimes = mimetype.split('/');
        var extension = mimes[mimes.length - 1];

        var filename      = myFile.filename;

        var file = filename+"."+extension;

        var newpath = path+"."+extension;

        fs.rename(path, newpath);

        var widget = {
            widgetType : "UPLOAD",
            upload : {
                url : file, //originalname;
                name : originalname
            }
        };

        if(widgetId){

            //Edit mode

            NoteModel
                .updateWidget(noteId, widgetId, widget)
                .then(
                    function(note) {

                        res.redirect("/project/client/#/editnote/"+noteId);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }
        else{

            //Create mode

            NoteModel
                .createWidget(noteId, widget)
                .then(
                    function(note) {

                        res.redirect("/project/client/#/editnote/"+noteId);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );

        }
    }
};