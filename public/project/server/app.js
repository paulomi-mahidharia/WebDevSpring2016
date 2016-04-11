module.exports = function(app, uuid, db, mongoose) {
    var UserModel   = require("./models/user/user.model.js")(db, mongoose);

    var NoteModel = require("./models/note/note.model.js")(db, mongoose);
    var NotebookModel = require("./models/notebook/notebook.model.js")(db, mongoose);

    var UserService = require("./services/user.service.server.js")(app, UserModel, NoteModel, uuid);

    var NoteService = require("./services/note.service.server.js")(app, NoteModel, NotebookModel, UserModel, uuid);

};