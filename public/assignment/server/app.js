module.exports = function(app, uuid) {
    var UserModel   = require("./models/user/user.model.js")();
    var service = require("./services/user.service.server.js")(app, UserModel, uuid);

    var formModel = require("./models/form/form.model.js")();
    var formService = require("./services/form.service.server.js")(app, formModel, uuid);

    var fieldService = require("./services/field.service.server.js")(app, formModel, uuid);
}