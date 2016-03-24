module.exports = function(app, uuid) {
    var UserModel   = require("./models/user/user.model.js")();
    var UserService = require("./services/user.service.server.js")(app, UserModel, uuid);

    //var FormModel = require("./models/form/form.model.js")();
    //var FormService = require("./services/form.service.server.js")(app, FormModel, uuid);

    //var FieldService = require("./services/field.service.server.js")(app, FormModel, uuid);
}