module.exports = function(app, uuid, db, mongoose) {
    var UserModel   = require("./models/user/user.model.js")(db, mongoose);
    var UserService = require("./services/user.service.server.js")(app, UserModel, uuid);

    var FormModel = require("./models/form/form.model.js")(db, mongoose);
    var FormService = require("./services/form.service.server.js")(app, FormModel, uuid);

    var FieldService = require("./services/field.service.server.js")(app, FormModel, uuid);
}