/**
 * Created by paulomimahidharia on 3/30/16.
 */
module.exports = function(mongoose) {

    var NoteSchema = require("../note/note.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        // note ids of notes this user likes
        likes: [String],
        facebook:   {
            id:    String,
            token: String
        },
        // movies this user likes
        likesNotes: [NoteSchema]
        // collection property sets
        // collection name to 'user'
    }, {collection: 'project.user'});

    return UserSchema;
};