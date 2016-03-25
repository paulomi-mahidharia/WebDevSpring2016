/**
 * Created by paulomimahidharia on 3/16/16.
 */

var mock = require("./user.mock.json");
module.exports = function() {
    var api = {
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function findUserByCredentials(credentials) {

        function findUserByCredentials(credentials) {
            for(var u in mock) {
                if( mock[u].username === credentials.username &&
                    mock[u].password === credentials.password) {
                    return mock[u];
                }
            }
            return null;
        }
    }
}