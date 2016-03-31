/**
 * Created by paulomimahidharia on 3/31/16.
 */

module.exports = function(mongoose) {

    var FieldSchema = require("./field.schema.server.js");

    // use mongoose to declare a user schema
    var FormSchema = mongoose.Schema({
        userId: String,
        title: String,
        //fields: [FieldSchema],
        created: Date,
        updated: Date
        // collection property sets
        // collection name to 'form'
    }, {collection: 'assignment.form'});

    return FormSchema;
};