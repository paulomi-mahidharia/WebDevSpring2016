/**
 * Created by paulomimahidharia on 3/15/16.
 */
module.exports = function(app) {
    var model   = require("./models/user.model.server.js")();
    var service = require("./services/user.service.server.js")(app, model);
}