module.exports = function(app, uuid) {
    var UserModel   = require("./models/user/user.model.js")();
    var UserService = require("./services/user.service.server.js")(app, UserModel, uuid);

    var NoteModel = require("./models/note/note.model.js")();
    var NotebookModel = require("./models/notebook/notebook.model.js")();
    var NoteService = require("./services/note.service.server.js")(app, NoteModel, NotebookModel, uuid);

    //var FormModel = require("./models/form/form.model.js")();
    //var FormService = require("./services/form.service.server.js")(app, FormModel, uuid);

    //var FieldService = require("./services/field.service.server.js")(app, FormModel, uuid);
}