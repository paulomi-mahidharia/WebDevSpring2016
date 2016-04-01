module.exports = function(app, uuid) {
    var UserModel   = require("./models/user/user.model.js")();
    var UserService = require("./services/user.service.server.js")(app, UserModel, uuid);

    var NoteModel = require("./models/note/note.model.js")();
    var NotebookModel = require("./models/notebook/notebook.model.js")();
    var NoteService = require("./services/note.service.server.js")(app, NoteModel, NotebookModel, uuid);

}