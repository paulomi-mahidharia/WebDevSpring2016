/**
 * Created by paulomimahidharia on 3/30/16.
 */
module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles:[String]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'assignment.user'});

    return UserSchema;
};